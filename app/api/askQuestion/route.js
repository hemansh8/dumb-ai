import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../firebaseAdmin';
import query from '../../../lib/queryApi';
import admin from "firebase-admin";
// import logo from "logo.jpg"

const handler = async (req, res) => {
    console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOO");
    const { prompt, chatId, model, session } = await req.json();

    if (!prompt) {
        console.log("PROMPT issue");
        return NextResponse.json({
            answer: "Please provide a prompt!"
        }, { status: 400 });
    }

    if (!chatId) {
        console.log("Chat ID issue");
        return NextResponse.json({
            answer: "Please provide a Chat ID!"
        }, { status: 400 });
    }

    try {
        const response = await query(prompt, chatId, model);

        const message = {
            text: response,
            createdAt: admin.firestore.Timestamp.now(),
            user: {
                _id: "ChatGPT",
                name: "ChatGPT",
                avatar: "/logo.jpg"
            }
        }


        await adminDb.collection('users').doc(session.user.email).collection('chats').doc(chatId).collection("messages").add(message);
        console.log(response, message);
 
        return NextResponse.json({
            answer: message.text
        }, { status: 200 });
    }
    catch (err) {
        console.log('Getting 500 error boys')
        return NextResponse.json({
            error: err.message
        }, { status: 500 });
    }
}

export { handler as GET, handler as POST }
