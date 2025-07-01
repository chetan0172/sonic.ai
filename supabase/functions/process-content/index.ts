import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { contentId, contentType } = await req.json();

    // Fetch content item
    const { data: contentItem, error: contentError } = await supabase
      .from('content_items')
      .select('*')
      .eq('id', contentId)
      .single();

    if (contentError || !contentItem) {
      throw new Error('Content not found');
    }

    // Process content based on type
    let processedContent;
    switch (contentType) {
      case 'video':
        processedContent = await processVideo(contentItem);
        break;
      case 'audio':
        processedContent = await processAudio(contentItem);
        break;
      case 'blog':
        processedContent = await processBlog(contentItem);
        break;
      default:
        throw new Error('Invalid content type');
    }

    // Store generated posts
    const { error: insertError } = await supabase
      .from('generated_posts')
      .insert(processedContent.map(post => ({
        content_item_id: contentId,
        ...post
      })));

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});

async function processVideo(contentItem) {
  // Get video transcription using Whisper API
  const transcription = await openai.audio.transcriptions.create({
    file: await fetch(contentItem.storage_path),
    model: "whisper-1",
  });

  // Generate content variations using GPT-4
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a social media content expert. Create engaging posts for different platforms based on video content."
      },
      {
        role: "user",
        content: `Create 5 engaging social media posts based on this video transcript: ${transcription.text}`
      }
    ],
  });

  // Transform the response into platform-specific posts
  const platforms = ['twitter', 'instagram', 'linkedin', 'tiktok'];
  return completion.choices[0].message.content.split('\n\n').map((content, index) => ({
    platform: platforms[index % platforms.length],
    content: content.trim(),
    status: 'draft'
  }));
}

async function processAudio(contentItem) {
  // Similar to video processing but optimized for audio
  const transcription = await openai.audio.transcriptions.create({
    file: await fetch(contentItem.storage_path),
    model: "whisper-1",
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a podcast content repurposing expert. Create engaging posts for different platforms based on podcast content."
      },
      {
        role: "user",
        content: `Create 5 engaging social media posts based on this podcast transcript: ${transcription.text}`
      }
    ],
  });

  const platforms = ['twitter', 'instagram', 'linkedin'];
  return completion.choices[0].message.content.split('\n\n').map((content, index) => ({
    platform: platforms[index % platforms.length],
    content: content.trim(),
    status: 'draft'
  }));
}

async function processBlog(contentItem) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a blog content repurposing expert. Create engaging posts for different platforms based on blog content."
      },
      {
        role: "user",
        content: `Create 5 engaging social media posts based on this blog content: ${contentItem.content}`
      }
    ],
  });

  const platforms = ['twitter', 'instagram', 'linkedin'];
  return completion.choices[0].message.content.split('\n\n').map((content, index) => ({
    platform: platforms[index % platforms.length],
    content: content.trim(),
    status: 'draft'
  }));
}