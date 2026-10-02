function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json;charset=UTF-8","access-control-allow-origin":"*"}})}

export async function onRequestGet({request,env}) {
  try {
    const url=new URL(request.url);
    const code=(url.searchParams.get("code")||"").trim().toUpperCase();
    if(!code) return json({error:"Escribe el código de la propuesta."},400);
    const row=await env.DB.prepare("SELECT id,code,a_name,a_date,a_place,a_why,a_promise,a_message,b_name,b_date,b_message,b_promise,accepted FROM proposals WHERE code=?").bind(code).first();
    if(!row) return json({error:"No encontramos esa propuesta. Revisa el código."},404);
    if(row.b_name) return json({error:"Esta propuesta ya fue respondida."},409);
    return json({record:row});
  } catch(e){return json({error:"No se pudo leer la propuesta."},500)}
}

export async function onRequestPost({request,env}) {
  try {
    const b=await request.json();
    if(!b.code||!b.name) return json({error:"Falta el código o el nombre."},400);
    const row=await env.DB.prepare("SELECT * FROM proposals WHERE code=?").bind(b.code.trim().toUpperCase()).first();
    if(!row) return json({error:"No encontramos esa propuesta. Revisa el código."},404);
    if(row.b_name) return json({error:"Esta propuesta ya fue respondida."},409);
    await env.DB.prepare(`UPDATE proposals SET b_name=?,b_date=?,b_message=?,b_promise=?,accepted=?,completed_at=CASE WHEN ?=1 THEN CURRENT_TIMESTAMP ELSE NULL END WHERE id=?`).bind(b.name,b.date||"",b.message||"",b.promise||"",b.accepted?1:0,b.accepted?1:0,row.id).run();
    const full=await env.DB.prepare("SELECT * FROM proposals WHERE id=?").bind(row.id).first();
    return json({complete:!!b.accepted,record:full});
  } catch(e){return json({error:"No se pudo guardar la respuesta."},500)}
}
