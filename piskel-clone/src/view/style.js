export default function styles() {
  document.getElementsByTagName('head')[0].innerHTML += `<style>
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');

.body {
 margin: 0;
 padding: 0;
 background-color: #1D1D1D;
 font-family: 'Righteous', cursive;
 overflow-x: hidden
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

.tools-which-change-canvas>i{
  font-size: 176%;
}

.tools-which-change-canvas {
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #3A3A3A;
}

.tools-which-change-canvas--lighten>i {
  transform: rotate(180deg);
}

.no-active {
  border: 4px solid #3A3A3A;
}

.active {
  border: 4px solid #FFD700;
}

/* choose color */
.main-tools--choose-color {
  height: 82px;
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

.main-tools-keyboard--i {
  color: #FFD700;
  font-size: 200%;
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
  height: 611px;
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

.scaled-divide-by-one {
  transform: scale(1);
}

.scaled-divide-by-two {
  transform: scale(0.5);
}

.scaled-divide-by-four {
  transform: scale(0.25);
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
}

.canvas-preview {
  cursor: pointer;
}

.preview--fps {
  display: grid;
  grid-template-columns: 30% 70%;
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

.under-preview-coordinates {
  color: #AAAA8f;
  margin-bottom: 0
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

.main-preview-right--buttons>i {
  font-size: 176%;
}

button:hover, input:hover {
  cursor: pointer;
}

.save-gif {
  position: absolute;
  right: 0px;
  width: 180px;
  height: 100px;
  display: none;
  grid-template-rows: 33% 33% 33%;
  background-color: #222222;
  justify-content: right;
  color: #ffd700;
  border-radius: 5px;
}

.main-preview-right--save:hover>p {
  display: block;
}

.download-gif-tooltip {
  display: none;
  color: #ffd700;
  position: absolute;
  margin-bottom: 10px;
  right: 50px;
  right: 51px;
  margin-top: -18px;
}

.save-gif--input-text {
  width: 30%;
  height: 40%;
  margin: 13px 60px;
  border: 0;
  background-color: #ffd700;
}

.save-gif--input-submit {
  width: 50%;
  margin: auto;
  border: 0;
  background-color: #ffd700;
}
/* tooltips */
.tools-tooltips {
  display: none;
  margin-top: -15px;
  margin-left: 45px;
  z-index: 3;
}

.tools-which-change-canvas:hover>span {
  display: block;
  position: absolute;
  background-color: #000;
  color: #fff;
  font-size: 90%;
}

.yellow-color {
  color: #ffd700;
}

.tool-tip-frame {
  display: none;
  color: #fff;
  position: absolute;
  background-color: #000;
  margin-top: -17px;
  margin-left: 25px;
  font-size: 80%;
}

.text-center:hover>span {
  display: block;
}

.image-frame {
  position: static;
}

.window-shortcuts {
  width: 1000px;
  height: 550px;
  top: 10%;
  left: 15%;
  position: absolute;
  background-color: #ffd700;
  z-index: 2;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  border-radius: 10px;
}

.display-none {
  display: none;
}

.headline-and-close-keyboard-shortcuts {
  display: flex;
}

.shortcuts-tools-headline {
  width: 90%;
  margin: 5px 0 0 10px;
  text-align: left;
  font-size: 165%;
  color: #000;
}

.close-shortcut-window {
  height: 33px;
  text-align: right;
  font-size: 170%;
  margin: 5px 0px 0 50px;
  cursor: pointer;
}

.shortcuts {
  display: grid;
  grid-template-columns: 70% 30%;
  background-color: #000;
  width: 99%;
  height: 440px;
  overflow-y: scroll;
  margin-left: 4px;
}

::-webkit-scrollbar {
  width: 9px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #C8B571;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #C8B571;
  -webkit-box-shadow: inset 0 0 6px #C8B571;
}
::-webkit-scrollbar-thumb:window-inactive {
background: #C8B571;
}

.list-of-tools-shortcuts {
  list-style: none;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(8, 12.5%);
}

.list-of-tools-shotcut--element {
  list-style: none;
  text-align: left;
  margin-bottom: 13px;
  display: flex;
}

.keyboard-shortcuts-icon {
  background-color: #3B3B3B;
  width: 25px;
  height: 25px;
  text-align: center;
  padding-top: 5px;
  border-radius: 5px
}

.shortcuts-letter {
  width: 30px;
  height: 25px;
  color: #ffd700;
  margin-left: 10px;
  margin-top: 1px;
  padding-top: 2px;
  text-align: center;
  border: 2px solid #ffd700;
}

.keyboard-shortcuts--all-pixels {
  display: grid;
  grid-template-rows: 50% 50%
}

.shortcuts-letter-ctrl {
  width: 65px;
  height: 25px;
  margin-left: 0;
}

.shortcuts-name {
  margin-top: 5px;
  margin-left: 15px;
  color: #EBEBEB;
}

.list-of-frames-shortcuts--element {
  list-style: none;
  text-align: left;
  margin-bottom: 13px;
  display: flex;
}

.bottom-of-window-with-shortcuts {
  width: 100%;
  display: grid;
  grid-template-columns: 75% 25%;
}

.bottom-shortcuts--text {
  margin: 15px 0 0 15px;
  text-align: left;
  width: 169px;
  height: 22px;
}

.bottom-shortcuts--restore {
  text-align: right;
  width: 180px;
  height: 20px;
  margin: 15px 0 0 15px;
  background-color: #D0D5D0;
  border-radius: 5px;
  border: 2px solid #B6BCB6;
}

.other-shortcuts {
  margin-bottom: 0;
  height: 50px
}

.other-shortcuts--keyboard {
  margin-top: 11px
}

.other-shortcuts--letter {
  margin-top: 10px
}

.restore-shortcuts-name {
  margin-top: 12px;
}

.customize-shortcuts--tooltip {
  display: none;
  position: absolute;
  color: #fff;
  background-color: #000;
  border-radius: 5px;
  margin-top: 380px;
  padding-top: 10px;
  font-size: 80%;
  width: 250px;
  height: 100px;
}

.bottom-shortcuts--text:hover+.customize-shortcuts--tooltip {
  display: block;
}

.bottom-shortcuts--text:hover {
  cursor: pointer;
}

.opacity-half {
  opacity: .5;
}

.white-button {
  color: #CBCBCB;
  border: 2px solid #CBCBCB;
}

/* landing page */
.landing-page--header {
  position: fixed;
}
.box-shadow {
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.landing-page-main {
  background-color: #706976;
}
.landing-page-main--examples {
  width: 100%;
  display: grid;
  grid-template-columns: 65% 25%;
  justify-content: center;
  height: 494px
}

.landing-page-examples--preview {
  margin-top: 10px;
  padding: 40px;
}

.landing-page-preview--headline {
  margin-top: 0;
  text-align: center;
}

.landing-page-preview--image {
  padding:20px
}

.landing-page-examples {
  list-style: none;
}

.landing-page--examples {
  display: grid;
  justify-content: center;
  margin-top: 10px;
  margin-left: 15px;
  padding: 20px;
}

.gif-example {
  background-color: #5E561C;
  border: 3px double #000;
  margin-top: 7px;
  margin-bottom: 7px;
}

.landing-page-functionality-and-about-me {
  display: grid;
  grid-template-columns: 65% 32%;
}

.landing-page-functionality {
  /* border: 5px solid #8C7B05;
  border-radius: 7px; */
  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 15px;
  padding: 27px;
}

.landing-page-functionality--headline {
  text-align: center;
  margin: 0;
}

.landing-page-functionality--about {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 10px;
}

.landing-page-functionality-about--headline {
  padding-left: 50px;
}

.color-black {
  color: #000;
}

.color-blue {
  color: #0743B5
}

.color-red {
  color: #B90707;
}

.functionality-list--element {
  color: #D1BA23;
}

.about-me-headline {
  text-align: right;
  padding-right: 80px;
}

.landing-page-about-me {
  margin: 136px 0 170px 10px;
  padding: 27px;
}

.about-me-list {
  list-style: none;
}

.about-me-list>li {
  text-align: right;
  padding-right: 80px;
}

.about-me-list-element--link {
  color: #D1BA23;
}

.about-me-list-element--link {
  text-decoration: none;
}
</style>`;
}
