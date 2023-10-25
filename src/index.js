import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    if (url.pathname === '/set') {
      const body = await request.json();
      const name = body.name;
      
      const currentValue = await env.NAMES.get(name);
      let setValue;

      if (!currentValue) {
        setValue = 'true';
        await env.NAMES.put(name, setValue);
      } else if (currentValue === 'false') {
        setValue = 'true';
        await env.NAMES.put(name, setValue);
      } else {
        setValue = 'false';
        await env.NAMES.put(name, setValue);
      }

      return new Response(setValue);
    }

    if (url.pathname === '/get') {
      const kvItems = await env.NAMES.list();
      const keys = kvItems.keys;
      const result = {};

      for (const key of keys) {
        let nameStatus = await env.NAMES.get(key.name);
        result[key.name] = nameStatus;
      }

      return new Response(JSON.stringify(result));
    }

    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      let pathname = new URL(request.url).pathname;
      return new Response(`"${pathname}" not found`, {
        status: 404,
        statusText: 'not found',
      });
    }
  },
};