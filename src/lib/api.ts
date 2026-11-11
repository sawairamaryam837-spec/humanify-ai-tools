export interface ApiResponse<T = any> {
  success?: boolean;
  result?: string;
  isDemoMode?: boolean;
  message?: string;
  error?: string;
  [key: string]: any;
}

const toolEndpoints: Record<string, string> = {
  humanizer: '/api/ai/humanize',
  paraphraser: '/api/ai/paraphrase',
  'tone-changer': '/api/ai/tone',
  simplifier: '/api/ai/simplify',
  summarizer: '/api/ai/summarize',
  'grammar-fix': '/api/ai/grammar',
};

export async function processAiTool(toolId: string, payload: Record<string, any>): Promise<ApiResponse> {
  const endpoint = toolEndpoints[toolId] || `/api/ai/${toolId}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(`Server returned unexpected response (status ${res.status}): ${responseText.slice(0, 100)}`);
    }

    if (!res.ok) {
      throw new Error(data.error || `Server returned error (${res.status})`);
    }
    return data;
  } catch (err: any) {
    console.error(`AI API call to ${endpoint} failed:`, err);
    throw err;
  }
}

export async function checkAiHealth(): Promise<{ hasKey: boolean; model: string; status: string }> {
  try {
    const res = await fetch('/api/ai/status');
    if (!res.ok) throw new Error('Status failed');
    return await res.json();
  } catch {
    return { hasKey: false, model: 'demo-local', status: 'fallback' };
  }
}
