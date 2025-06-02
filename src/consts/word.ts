export const WORDS = [
  ['test', 'test'],
  ['Sinbasiwowatarutoki,hassyawosiraserunibanmenosuzuberuga,kiritomadehaienaikugatunoasa', '新橋を渡る時、発車を知らせる二番目の鈴ベルが、霧とまではいえない九月の朝 「或る女」'],
  ['Kadono,gozonnzideirassyaimasyou.juunenizenninakunattasennoottonanodegozaimasu', '門野、御存知でいらっしゃいましょう。十年以前になくなった先の夫なのでございます。「人でなしの恋」'],
  ['Hazinoooisyougaiookuttekimasita.Zibunniwa,ninngennoseikatutoiumonoga', '恥の多い生涯を送ってきました。自分には、人間の生活というものが 「人間失格」'],
  ['Wagahaiwanekodearu.Namaehamadanai.Dokodeumaretakatontokentougatukanu.', '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。「吾輩は猫である」'],
  ['Aruhinokuregatanokotodearu.Hitorinogeninnga,rasyoumonnositadeamayamiomatteita.', 'ある日の暮方の事である。一人の下人が、羅生門の下で雨やみを待っていた。「羅生門」'],
]

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}
shuffleArray(WORDS)
