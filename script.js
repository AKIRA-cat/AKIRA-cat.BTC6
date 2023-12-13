'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const questions = [
  `console.log("JavaScript")`,
  `const greeting = "Hello"`,
  `let number = 100`,
  `function addTen(number){}`,
  'document.getElementsByClassName("deep")',
  'document.getElementsById("result")',
  'button.addEventListener("click",function())',
  `Mozilla Developer Network`,
  `for(let i = 0; i > 10; i++){}`,
  `for(const element of array){}`,
  `for(const key in Object){}`,
  `return element = "string"`
];
const explanations = [
  `コンソールに文字列でJavaScriptと表示する`,
  `再定義できない変数（定数）greeting「挨拶」にHelloを宣言する。`,
  `再定義可能な変数 number「数値」に数値型で100を宣言する`,
  `仮引数にnumberを持つ関数 addTen「足す10」を宣言する`,
  `htmlからクラス名deep「深い」を持つ要素を取得する
    クラスは複数ある為複数形Elements,配列に入る`,
  `htmlからid名result「結果」を持つ要素を取得する`,
  `button「ボタン」がクリックされたら
    function「関数」を呼び出す`,
  `MDNはWEB開発技術者用の情報がたくさんある`,
  `同じ処理を10回繰り返す`,
  `array「配列」をインデックス0から
    element「要素」に順番に入れ、
    配列数分繰り返し処理する`,
  `object「オブジェクト」のキーをkeyに
    順番に入れ、キーの数分繰り返し処理する`,
  `変数element「要素」にstring「文字列」を
    宣言し関数を終了する`
];

const entered = document.getElementById("entered");
const remained = document.getElementById("remained");
const inputText = document.getElementById("inputText");
const explanation = document.getElementById("explanation");
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
const clearVideo = document.getElementById("clearVideo");
const missVideo = document.getElementById("missVideo");

let pointer = [""];
let spaceText;
let remainedTextWords = remained.textContent.split("");
let enteredTextWords = [];
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
  // 問題文をランダムで選ぶ
  const randomNumber = Math.floor(Math.random() * questions.length);
  questionText = questions[randomNumber];

  // 画面に新しい問題文をセット
  entered.innerText = "";
  remained.innerText = questionText;
  explanation.innerText = explanations[randomNumber];
  pointer = [""];
  spaceText = questionText.split("");
  spaceText.shift();
  clearCount++;

  // 一度選ばれた問題は配列から削除
  questions.splice(randomNumber, 1);
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
// inputに何か入力されたら
inputText.addEventListener("input", (e) => {
  // タイマースタート
  if (timeCount === 0) {
    timeCount = setInterval(() => {
      timeStart++,
        timeMin = Math.floor(timeStart / 60);
      timeSec = timeStart % 60;
      time.textContent = `${timeMin} min  ${timeSec} sec`;
    }, 1000);
  };
  if (remainedTextWords[0] === e.data) {

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
  };
  if (missText === 0) {
    // ノーミスコメント表示
    miss.textContent = "Perfect";
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
