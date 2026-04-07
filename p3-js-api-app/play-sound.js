// added function to give a sound a async await
function playSound(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);

    audio.play().catch(reject);
    audio.onended = () => resolve();
  });
}


export async function soundPlay(src) {
      await playSound(src);
      } 