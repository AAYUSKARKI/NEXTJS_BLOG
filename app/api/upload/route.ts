import { NextRequest, NextResponse } from 'next/server';
import {v2 as cloudinary} from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dimahkbnh', 
    api_key: '169688681512636', 
    api_secret:  '7oU-2vtNkuauXhGCyvbCNZxzh9E'
});

interface CloudinaryUploadResult{
    secure_url: string;
    [key: string]: any;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File|null;

    if(!file){
        return NextResponse.json({error: "File not found"}, {status: 400})
    }


    const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {folder: 'Images-nextblog'},
                (error, result) => {
                    if(result){
                        resolve(result);
                    } else {
                        console.log(error);
                        reject(error);
                    }
                }
            )
            uploadStream.end(buffer)
        })
        return NextResponse.json({ location: result.secure_url}, {status: 200})
    } catch (error) {
        console.log(error,'upload error');
        return NextResponse.json({error: error}, {status: 500})
    }

}
