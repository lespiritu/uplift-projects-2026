export async function cohereAnnounce(result, matches, winAmount){

  // to get the result into string format
  let colorResuls = "";
  const API_KEY = "Nnk2WHVlMGxQOWNCaGlNZExOV2pDR2pOUm9GQ1ludlFLUTNVQkU0aw==";

  result.forEach(color => colorResuls += `${color.color}, `)
  
  try{
    const response = await fetch("https://api.cohere.com/v2/chat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${atob(API_KEY)}` 
      },
      body:JSON.stringify({
        model:"command-a-03-2025",
        messages:[
          {
            role:"assistant",
            content:`Announce the result of a color game in a fun. and short only. The result colors are: ${colorResuls}. Color matches: ${matches}. You won: ${winAmount}.`
          }
        ]
      })
    });

    const data = await response.json();
    const aiMessage = data?.message?.content?.[0]?.text || `The result colors are: ${colorResuls}. Color matches: ${matches}. You won: ${winAmount}!`;
    return aiMessage;
    
  }
  catch (err){
    return `The result colors are: ${colorResuls}. Color matches: ${matches}. You won: ${winAmount}.`
  }

}