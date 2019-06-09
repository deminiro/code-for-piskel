export default function styles() {
  document.getElementsByTagName('head')[0].innerHTML += `<style>
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');

.body {
 margin: 0;
 padding: 0;
 background-color: #1D1D1D;
 font-family: 'Righteous', cursive;
}

.white-color {
  color: #ffffff;
}

/* header */
.header {
  width: 100%;
  height: 2.5rem;
  display: grid;
  grid-template-columns: 20% 20% 20%;
  grid-gap: 20%;
  background-color: #2D2D2D;
}

.header--headline-of-page {
  font-size: 1.8rem;
  text-decoration: none;
  padding-left: 1.3rem;
  padding-top: 0.1rem;
}

.header-headline--new {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
  padding: 5px;
}

.header-block--buttons {
  text-align: right;
  padding: 5px 5px 0 0;
}

.header-buttons {
  background-color: #ffd700;
  border: 1px solid #ffd700;
  border-radius: 1px;
  height: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
}

/* main */
.main {
  width: 100%;
  height: 37.8rem;
  padding-top: 5px;
  display: grid;
  grid-template-columns: 7.2% 9.2% 63.9% 19.7%;
}

/* tools to canvas */
/* tool to change size of pen */
.main-tools--buttons-pen-size {
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  padding: 58px 0 0 4px;
}

.main-tools-pen-size {
  height: 20px;
  border: 2px solid #444444;
  background: none;
  margin-right: 1px;
}

.main-tools-pen-size>p {
  background-color: #ffffff;
  margin: 0;

}

.main-tools-pen-size:first-child>p {
  width: 5px;
  height: 5px;
}

.main-tools-pen-size:nth-child(2)>p {
  width: 7px;
  height: 7px;
}

.main-tools-pen-size:nth-child(3){
  padding-left: 3px;
}

.main-tools-pen-size:nth-child(3)>p {
  width: 10px;
  height: 10px;
}

.main-tools-pen-size:nth-child(4) {
  padding-left: 2px;
}

.main-tools-pen-size:nth-child(4)>p {
  width: 13px;
  height: 13px;
}

/* main tools to change canvas */
.main-tools--tools-which-change-canvas {
  width: 95%;
  height: 383px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2px;
  padding-top: 7px;
  grid-template-rows: repeat(8, 46px);
}

.tools-which-change-canvas {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 3px solid #3A3A3A;
  background-color: #3A3A3A;
}

/* choose color */
.main-tools--choose-color {
  height: 100px;
  padding: 20px 0 0 7px;
  display: flex;
}

.tools-choose-color--top, .tools-choose-color--bottom {
  width: 36px;
  height: 36px;
  margin:0;
  border: none;
}

.tools-choose-color--top {
  position: relative;
  z-index: 2;
}

.tools-choose-color--bottom {
  position: relative;
  z-index: 1;
  right: 18px;
  top: 26px;
}

.main-tools--keyboard {
  text-align: center;
}

.fa-keyboard {
  color: #FFD700;
}

/* frames */
.main-div-of-frames {
  display: grid;
  grid-template-columns: 88% 12%;
}
.block-frames-outer {
  border: 1px solid grey;
  box-shadow: 0 6px 10px rgba(0,0,0,0.5);
}

.block-frames-inner {
  padding: 0;
}

.ul-of-frames {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.yellow-border {
  border: 2px solid #FFD700;
}

.gray-border {
  border: 2px solid #888888;
}

.li-frame {
  background-image: url('../src/view/assets/setka.png');
  width: 98px;
  height: 98px;
  display: grid;
  grid-template-columns: 25% 25%;
  grid-gap: 50%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.li-frame>div {
  height: 25px;
  width: 25px;
}

.frame-top-left-item {
  border-top-left-radius: 5px;
}

.frame-top-right-item {
  border-top-right-radius: 5px;
}

.frame-bottom-left-item {
  border-bottom-left-radius: 5px;
}

.frame-bottom-right-item {
  border-bottom-right-radius: 5px;
}

.canvas-frame:hover, .frame-top-right-item:hover, .frame-bottom-left-item:hover, .frame-bottom-right-item:hover {
  cursor: pointer;
}

.gray-frame-items {
  background: #888888;
}

.yellow-frame-items {
  background: #FFD700;
}

.canvas-frame {
  position: absolute;
  margin-top: 27px;
  margin-left: 19px;
  width: 60px;
  height: 46px;
}

.number-of-frame {
  margin: 0;
  padding: 0;
}
.frame-top-right-item>i, .frame-bottom-right-item>i, .frame-bottom-left-item>i {
  margin-top: 3px;
}

.text-center{
  text-align: center;
}

.text-center>i {
  margin-top: 3px;
}

.button-add-new-frame {
  margin-top: 20px;
  display: flex;
  background: #222222;
  border: 2px solid #888888;
  width: 102px;
}

.button-add-new-frame>i {
  margin-top: 8px;
}

.button-frame-text {
  margin: 0;
}

.main-frames-line {
  border: none;
  width: 5px;
  height: 607px;
  background-color: #252525;
  margin: 0;
}

/* main-canvas, on which drawing */
.main-div-of-canvas {
  background-color: #A0A0A0;
  text-align: center;
}

.main-div--canvas {
  background-image: url('../src/view/assets/setka.png');
  margin: 0;
  padding: 0;
}

/* right side of page */
/* preview */
.main-div-of-preview-and-settings {
  width: 100%;
  display: grid;
  grid-template-columns: 79% 21%;
}

.main-preview--left-column {
  padding-left: 7px;
}

.main-preview-left-canvas-with-fps {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 88% 12%;
  height: 228px;
}

.canvas-preview {
  background-image: url('../src/view/assets/setka.png');
  text-align: center;
  padding-top: 20%;
}

.preview--fps-with-onion {
  display: grid;
  grid-template-columns: 20% 80%;
}

.preview--onion {
  background-image: url('/src/view/assets/onion.png');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 26px;
}

.preview--fps {
  display: grid;
  grid-template-columns: 30% 70%;
}

.preview-fps--number-fps {
  margin: 0;
  padding-top: 4px;
  padding-left: 10px;
  color: #AAAA8F;
}

.main-div-under-preview--form>fieldset {
  text-align: center;
  color: #AAAA8F
}

/* right column */
.main-preview--right-column {
  display: grid;
  grid-template-rows: repeat(5, 12%);
  grid-gap: 3px;
  padding-left: 10px;
  padding-top: 15rem;
}

.main-preview-right--buttons {
  padding: 0;
  border: none;
  background-color: #3A3A3A;
  border-radius: 5px;
}

button:hover, input:hover {
  cursor: pointer;
} </style>
`;
}
