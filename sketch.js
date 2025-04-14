let dots = []; // 儲存圓點屬性的陣列
let portfolioOptions = []; // 儲存作品集選項按鈕的陣列
let iframe; // 用於嵌入網址的 iframe 元素
let introText; // 用於顯示自我介紹的文字元素
let introBox; // 用於顯示自我介紹的視窗背景
let introVisible = false; // 用於追蹤自我介紹視窗是否顯示
let quizBox; // 用於顯示測驗卷的視窗
let quizVisible = false; // 用於追蹤測驗卷視窗是否顯示
let userAnswers = []; // 儲存使用者的答案
let correctAnswers = ["否", "否", "是"]; // 正確答案

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); // 設置背景為黑色

  // 創建按鈕並設置樣式
  let homeButton = createButton('首頁');
  styleButton(homeButton, 20, 20);
  homeButton.mousePressed(() => {
    iframe.hide(); // 點擊首頁按鈕時隱藏 iframe
    if (introText) introText.hide(); // 隱藏自我介紹文字
    if (introBox) introBox.hide(); // 隱藏自我介紹視窗
    introVisible = false; // 更新狀態
  });

  let aboutButton = createButton('自我介紹');
  styleButton(aboutButton, 130, 20);
  aboutButton.mousePressed(() => {
    if (introVisible) {
      // 如果視窗已顯示，則隱藏
      if (introText) introText.hide();
      if (introBox) introBox.hide();
      introVisible = false;
    } else {
      // 如果視窗未顯示，則創建並顯示
      if (!introBox) {
        introBox = createDiv();
        introBox.style('background', 'linear-gradient(145deg, #3a3a3a, #1a1a1a)');
        introBox.style('border-radius', '15px');
        introBox.style('padding', '30px');
        introBox.style('box-shadow', '5px 5px 15px #000000, -5px -5px 15px #4a4a4a');
        introBox.style('color', '#ffffff');
        introBox.style('width', '500px');
        introBox.style('position', 'absolute');
        introBox.style('top', `${(windowHeight - 200) / 2}px`); // 視窗置中
        introBox.style('left', `${(windowWidth - 500) / 2}px`); // 視窗置中
      }
      introBox.show();

      if (!introText) {
        introText = createP("大家好我是張重益，目前教科3年級。");
        introText.parent(introBox);
        introText.style('font-size', '24px');
        introText.style('margin', '0');
      }
      introText.show();
      introVisible = true; // 更新狀態
    }
  });

  let portfolioButton = createButton('作品集');
  styleButton(portfolioButton, 270, 20);
  portfolioButton.mousePressed(togglePortfolioOptions); // 點擊顯示/隱藏作品集選項

  let quizButton = createButton('測驗卷');
  styleButton(quizButton, 400, 20);
  quizButton.mousePressed(() => {
    if (quizVisible) {
      // 如果測驗卷視窗已顯示，則隱藏
      if (quizBox) quizBox.hide();
      quizVisible = false;
    } else {
      // 如果測驗卷視窗未顯示，則創建並顯示
      if (!quizBox) {
        quizBox = createDiv();
        quizBox.style('background', 'linear-gradient(145deg, #3a3a3a, #1a1a1a)');
        quizBox.style('border-radius', '15px');
        quizBox.style('padding', '20px');
        quizBox.style('box-shadow', '5px 5px 15px #000000, -5px -5px 15px #4a4a4a');
        quizBox.style('color', '#ffffff');
        quizBox.style('width', '500px');
        quizBox.style('position', 'absolute');
        quizBox.style('top', `${(windowHeight - 300) / 2}px`); // 視窗置中
        quizBox.style('left', `${(windowWidth - 500) / 2}px`); // 視窗置中

        // 添加測驗方式
        let quizTitle = createP("測驗方式：是非題");
        quizTitle.parent(quizBox);
        quizTitle.style('font-size', '20px');
        quizTitle.style('margin', '0 0 20px 0');

        // 隨機生成三題測驗題目
        let questions = [
          "地球是圓的。",
          "太陽是地球的衛星。",
          "水在0°C會結冰。",
          "人類可以在月球上呼吸空氣。",
          "1+1等於2。",
          "植物需要陽光才能進行光合作用。"
        ];
        let selectedQuestions = shuffle(questions).slice(0, 3); // 隨機選擇三題

        userAnswers = []; // 清空使用者答案
        for (let i = 0; i < selectedQuestions.length; i++) {
          let question = createP(`${i + 1}. ${selectedQuestions[i]}`);
          question.parent(quizBox);
          question.style('font-size', '18px');
          question.style('margin', '10px 0');

          // 添加「是」按鈕
          let yesButton = createButton('是');
          yesButton.parent(quizBox);
          yesButton.style('margin', '0 10px 10px 0');
          yesButton.mousePressed(() => {
            userAnswers[i] = "是";
            checkAnswers();
          });

          // 添加「否」按鈕
          let noButton = createButton('否');
          noButton.parent(quizBox);
          noButton.style('margin', '0 0 10px 0');
          noButton.mousePressed(() => {
            userAnswers[i] = "否";
            checkAnswers();
          });
        }
      }
      quizBox.show();
      quizVisible = true; // 更新狀態
    }
  });

  let videoButton = createButton('教學影片');
  styleButton(videoButton, 520, 20);
  videoButton.mousePressed(() => {
    iframe.attribute('src', 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week6/20250328_113153.mp4');
    iframe.show(); // 顯示嵌入的影片
    if (introText) introText.hide(); // 隱藏自我介紹文字
    if (introBox) introBox.hide(); // 隱藏自我介紹視窗
    introVisible = false; // 更新狀態
  });

  // 創建 iframe 元素，初始為隱藏
  iframe = createElement('iframe');
  iframe.position(50, 100); // 設置 iframe 的位置
  iframe.size(windowWidth - 100, windowHeight - 150); // 設置 iframe 的大小
  iframe.hide(); // 初始隱藏

  // 創建作品集選項按鈕，初始為隱藏
  let options = [
    { label: '作品集1', url: 'https://yeee1233.github.io/20250303/' },
    { label: '作品集2', url: 'https://yeee1233.github.io/20250310math/' },
    { label: '作品集3', url: 'https://yeee1233.github.io/vscode0324/' },
    { label: '教學筆記', url: 'https://hackmd.io/@DaB56wxfRZCiWJ71MZQ6Dg/ByElBW9Rkl' },
    
  ];

  for (let i = 0; i < options.length; i++) {
    let optionButton = createButton(options[i].label);
    styleButton(optionButton, 280, 100 + i * 50); // 每個選項按鈕的位置
    optionButton.mousePressed(() => {
      iframe.attribute('src', options[i].url); // 設置 iframe 的網址
      iframe.show(); // 顯示 iframe
      if (introText) introText.hide(); // 隱藏自我介紹文字
      if (introBox) introBox.hide(); // 隱藏自我介紹視窗
      introVisible = false; // 更新狀態
    });
    optionButton.hide(); // 初始隱藏
    portfolioOptions.push(optionButton);
  }
}

function draw() {
  background(0, 50); // 使用透明背景，讓圓點逐漸消失

  // 每幀新增一個圓點
  if (dots.length < 200) { // 限制圓點數量
    dots.push({
      x: random(width), // 隨機 X 座標
      y: random(height), // 隨機 Y 座標
      r: random(20, 50), // 隨機半徑
      color: [random(255), random(255), random(255)], // 隨機顏色
      alpha: 0 // 初始透明度
    });
  }

  // 更新並繪製圓點
  for (let i = dots.length - 1; i >= 0; i--) {
    let dot = dots[i];
    dot.alpha = min(dot.alpha + 5, 255); // 逐漸增加透明度
    fill(dot.color[0], dot.color[1], dot.color[2], dot.alpha); // 設置顏色和透明度
    noStroke(); // 移除邊框
    ellipse(dot.x, dot.y, dot.r, dot.r); // 繪製圓點

    // 如果圓點完全透明，將其移除
    if (dot.alpha >= 255) {
      dots.splice(i, 1); // 從陣列中移除該圓點
    }
  }
}

// 設置按鈕樣式的函式
function styleButton(button, x, y) {
  button.position(x, y);
  button.style('font-size', '20px'); // 放大字體
  button.style('padding', '10px 20px'); // 增加內邊距
  button.style('border-radius', '10px'); // 圓角
  button.style('border', '2px solid #ffffff'); // 白色邊框
  button.style('background', 'linear-gradient(145deg, #3a3a3a, #1a1a1a)'); // 漸層背景
  button.style('color', '#ffffff'); // 白色文字
  button.style('box-shadow', '5px 5px 15px #000000, -5px -5px 15px #4a4a4a'); // 添加陰影
  button.mouseOver(() => {
    button.style('background', 'linear-gradient(145deg, #4a4a4a, #2a2a2a)'); // 滑鼠懸停效果
  });
  button.mouseOut(() => {
    button.style('background', 'linear-gradient(145deg, #3a3a3a, #1a1a1a)'); // 恢復原樣
  });
}

// 顯示或隱藏作品集選項的函式
function togglePortfolioOptions() {
  for (let optionButton of portfolioOptions) {
    if (optionButton.elt.style.display === 'none') {
      optionButton.show(); // 顯示選項按鈕
    } else {
      optionButton.hide(); // 隱藏選項按鈕
    }
  }
}

// 隨機打亂陣列的函式
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkAnswers() {
  // 確保使用者已回答所有題目
  if (userAnswers.length === correctAnswers.length && !userAnswers.includes(undefined)) {
    let isCorrect = true;

    // 檢查每個答案是否正確
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] !== correctAnswers[i]) {
        isCorrect = false;
        break;
      }
    }

    // 顯示結果提示
    if (isCorrect) {
      alert("恭喜你，答對了！");
    } else {
      alert("很遺憾，答案不正確，請再試一次！");
    }

    // 隱藏測驗視窗並重置狀態
    if (quizBox) quizBox.hide();
    quizVisible = false;
    userAnswers = []; // 重置使用者答案
  }
}