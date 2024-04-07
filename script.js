'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//問題文
const questions = [
  `上下一致至誠業務に服し、産業報国の実を挙ぐべし。`,
  `研究と創造に心を致し、常に時流に先んずべし。`,
  `華美を戒め質実剛健たるべし。`,
  `温情友愛の精神を発揮し家庭的美風を作興すべし。`,
  '神仏を尊崇し報恩感謝の生活を為すべし。',
];
// 読み方
const pronunciations = [
  `じょうげいっちしせいぎょうむにふくし、さんぎょうほうこくのじつをあぐべし`,
  `けんきゅうとそうぞうにこころをいたし、つねにじりゅうにさきんずべし`,
  `かびをいましめ、しつじつごうけんたるべし`,
  `おんじょうゆうあいのせいしんをはっきし、かていてきびふうをさっこうすべし`,
  `しんぶつをそんすうしほうおんかんしゃのせいかつをなすべし`
];
// 解説
const explanations = [
  `みんなお互いに自分の受持つ仕事を誠実に果たし、
  自分の職域を通じ広く社会に報いるよう、
  そして、日本の国がより立派な国となるよう
  努力しなければならない。`,
  `いつも、研究と創造の精神を忘れず、
  つねに時代の先頭に立って進もう。`,
  `ぜいたくや、はでなふるまいはせず、
  強い心を持って堅実に`,
  `あたたかい心を持って助け合い、
  家族のように仲良くしよう。`,
  `いつも敬けんな気持ちを忘れず、元気に、明るく
  暮せることを感謝して毎日をすごすようにしよう`
];

// htmlid保存
const entered = document.getElementById("entered");
const remained = document.getElementById("remained");
const inputText = document.getElementById("inputText");
const explanation = document.getElementById("explanation");
const pronunciation =document.getElementById("pronunciation");
const game = document.getElementById("game");
const message = document.getElementById("message");
const miss = document.getElementById("miss");
const time = document.getElementById("time");
const point = document.getElementById("point");
const space = document.getElementById("space");
const missCount = document.getElementById("missCount");
const ftinishTime = document.getElementById("finishTime");
const count = document.getElementById("count");
const finish = document.getElementById("finish");
const finishText = document.getElementById("finishText")
const clearVideo = document.getElementById("clearVideo");
const missVideo = document.getElementById("missVideo");

// 変数初期設定
let pointer = [""];
let spaceText;
let remainedTextWords = remained.textContent.split("");
let enteredTextWords = [];
let questionNumber = 0
let questionText;
let explanationText;
let missText = 0;
let clearText = 0;
let timeText = "";
let timeCount = 0;
let timeStart = 0;
let timeMin;
let timeSec;
let questionsLength = questions.length;
let clearCount = -1;

// 新しい問題文をランダムにセットする関数
function setQuestion() {
  // 問題文番号
  const randomNumber = Math.floor(Math.random() * questions.length);
  questionText = questions[randomNumber];

  // 画面に新しい問題文をセット
  entered.innerText = "";
  remained.innerText = questionText;
  pronunciation.innerText = pronunciations[randomNumber];
  explanation.innerText = explanations[randomNumber];
  pointer = [""];
  spaceText = questionText.split("");
  spaceText.shift();
  clearCount++;

  // 一度選ばれた問題は配列から削除
  questions.splice(randomNumber, 1);
  pronunciations.splice(randomNumber,1);
  explanations.splice(randomNumber, 1);

  // これまでフォームに入力された値をリセット
  inputText.value = "";

  // 「入力済み文字」「未入力文字」の配列の中身をリセット
  enteredTextWords = [];
  remainedTextWords = questionText.split("");
  space.innerText = spaceText.join("");
  point.innerText = pointer.join("");
  count.innerHTML = `${clearCount} / ${questionsLength}`;
}
setQuestion();
// inputで日本語変換されたら
inputText.addEventListener("input", (e) => {
  // タイマースタート
  if (timeCount === 0) {
    timeCount = setInterval(() => {
      timeStart++,
        timeMin = Math.floor(timeStart / 60);
      timeSec = timeStart % 60;
      time.textContent = `${timeMin} min  ${timeSec} sec`;
    }, 1000);
  }
});
inputText.addEventListener("compositionend", (e) => {
  for (let i = 0; i < e.data.length; i++) {
    if (remainedTextWords[0] === e.data.slice(i, i+1)) {
      // 入力済み配列に1文字追加
      enteredTextWords.push(remainedTextWords[0]);
      pointer = enteredTextWords;
      // 未入力先頭から1文字削除
      remainedTextWords.shift();
      spaceText.shift();

      // テキストを連結
      entered.innerText = enteredTextWords.join("");
      remained.innerText = remainedTextWords.join("");
      point.innerText = pointer.join("");
      space.innerText = spaceText.join("");

      // 全文字入力したら新しい問題文をセット
      if (remainedTextWords.length <= 0) {
        if (questions.length <= 0) {
          finishFanc();
        } else {
          setQuestion(); // 新しい問題文をセット
        }
      }
    } else {
      // ミス入力をカウント
      missText++;
      // ミス表示に入力
      missCount.innerText = missText;
      break
    }
  }
});
// スコア画面
function finishFanc() {
  // 時間表示
  ftinishTime.textContent = time.textContent;
  // ゲーム画面を非表示
  game.classList.add("hidden");
  // 終了メッセージ表示
  message.classList.remove("hidden");
  if (missText > clearCount) {
    // ハイスコア動画非表示
    clearVideo.style.display = "none";
    // ミススコア動画表示
    missVideo.style.display = "block";
    finishText.textContent = 'You`re fired!'
  };
  if (missText === 0) {
    // ノーミスコメント表示
    // finishText.textContent = 'Good Job!'
    miss.textContent = 'Perfect';
  } else {
    // ミスカウントコメント表示
    miss.textContent = `${missText} Times Miss`;
  }
  // ミスカウントリセット
  missText = 0;
  // タイマーストップ
  clearInterval(timeCount);
}
// 終了ボタン
finish.addEventListener("click", () => {
  finishFanc();
});
