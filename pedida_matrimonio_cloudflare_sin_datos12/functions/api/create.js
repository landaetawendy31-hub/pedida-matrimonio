function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json;charset=UTF-8","access-control-allow-origin":"*"}})}
function code(){return crypto.randomUUID().replaceAll("-","").slice(0,8).toUpperCase()}

export async function onRequestPost({request,env}) {
  try {
    const b=await request.json();
    if(!b.name) return json({error:"Escribe tu nombre."},400);
    let c=code();
    while((await env.DB.prepare("SELECT id FROM proposals WHERE code=?").bind(c).first())) c=code();
    await env.DB.prepare(`INSERT INTO proposals (code,a_name,a_date,a_place,a_why,a_promise,a_message) VALUES (?,?,?,?,?,?,?)`)
      .bind(c,b.name,b.date||"",b.place||"",b.why||"",b.promise||"",b.message||"").run();
    return json({code:c});
  } catch(e){return json({error:"No se pudo guardar la propuesta."},500)}
}