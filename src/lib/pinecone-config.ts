import { Pinecone } from '@pinecone-database/pinecone';

// let pinecone: Pinecone | null = null;

// // const pc = new Pinecone({ apiKey: 'YOUR_API_KEY' });


// export const getPinecodeClient = async () =>{
//     if(!pinecone){

//         pinecone = new PineconeClient();

        
//     }
// }

if (!process.env.PINECONE_API_KEY){
    throw new Error("PINECONE_API_KEY is not set");
}

const pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export default pineconeClient;