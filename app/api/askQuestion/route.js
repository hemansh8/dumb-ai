import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../firebaseAdmin';
import query from '../../../lib/queryApi';
import admin from "firebase-admin";
// import logo from "logo.jpg"

const handler = async (req, res) => {
    
    const { prompt, chatId, model, session } = await req.json();

    if (!prompt) {
        return NextResponse.json({
            answer: "Please provide a prompt!"
        }, { status: 400 });
    }

    if (!chatId) {
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
 
        return NextResponse.json({
            answer: message.text || "Hello"
        }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({
            error: err.message || "Error"
        }, { status: 500 });
    }
}

export { handler as GET, handler as POST }
