'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const questions = [
    // "aaa",
    // "bb",
    `console.log("JavaScript")`,
    `const greeting = "Hello"`,
    `let number = 100`,
    `function addTen(number){}`,
    'document.getElementsByClassName("deep")',
    'document.getElementsById("result")',
    'bottun.addEventListener("click",function())',
    `Mozilla Developer Network`,
    `for(let i = 0; i > 10; i++){}`,
    `for(const element of array){}`,
    `for(const key in Object){}`,
];
const explanations = [
    // "aa",
    // "b\r\nb"
    `コンソールに文字列でJavaScriptと表示する`,
    `再定義できない変数（定数）greeting「挨拶」にHelloを宣言する。`,
    `再定義可能な変数 number「数値」に数値型で100を宣言する`,
    `仮引数にnumberを持つ関数 addTen「足す10」を宣言する`,
    `htmlからクラス名deep「深い」を持つ要素を取得する
    クラスは複数ある為複数形Elements,配列に入る`,
    `htmlからid名result「結果」を持つ要素を取得する`,
    `bottun「ボタン」がクリックされたら
    function「関数」を呼び出す`,
    `MDNはWEB開発技術者用の情報がたくさんある`,
    `同じ処理を10回繰り返す`,
    `array「配列」をインデックス0から
    element「要素」に順番に入れ、
    配列数分繰り返し処理する`,
    `object「オブジェクト」のキーをkeyに
    順番に入れ、キーの数分繰り返し処理する`,
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

inputText.addEventListener("input", (e) => {
    if (timeCount === 0) {
        timeCount = setInterval(() => {
            timeStart++,
                timeMin = Math.floor(timeStart / 60);
            timeSec = timeStart % 60;
            time.textContent = `${timeMin} min  ${timeSec} sec`;
        }, 1000);
    };
    if (remainedTextWords[0] === e.data) {

        // 入力済み文字の配列の最後に1文字追加
        enteredTextWords.push(remainedTextWords[0]);
        pointer = enteredTextWords;
        // 未入力文字の配列の先頭から1文字削除
        remainedTextWords.shift();
        //pointer.unshift(".")
        spaceText.shift();

        // 入力済みテキスト＆未入力テキストを連結して画面表示
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
        missText++;
        missCount.innerText = missText;
    }
});
function finishFanc() {
    ftinishTime.textContent = time.textContent;
    game.classList.add("hidden"); // ゲーム画面を非表示
    message.classList.remove("hidden"); // 終了メッセージ表示
    if(missText > clearCount){
        clearVideo.style.display = "none";
        missVideo.style.display = "block";
    };
    if (missText === 0) {
        miss.textContent = "Perfect";
    } else {
        miss.textContent = `${missText} Times Miss`;
    }
    missText = 0;
    clearInterval(timeCount);
}
// 終了ボタン
finish.addEventListener("click", () => {
    finishFanc();
});
