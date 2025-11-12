import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
  box-sizing: border-box;
}
/* 
* {
  word-break: keep-all;
  padding: 0;
  margin: 0;
  background-color: #f8f8f8;
} */



/* body {
  background-color: #f8f8f8;

} */

:root {

  --main: #a0dcea;
  --point: #a0354d;
  --background-1: #f8f8f8;
  --background-2: #121212;
  --background-3: #e9efda;

  /* 🔵 Blue scale */
  --blue-01: #dcfaff;
  --blue-02: #b4e6f1;
  --blue-00: #a0dcea;
  --blue-03: #8acbd6;
  --blue-04: #61b3c1;

  /* 🟢 Green scale */
  --green-01: #f9fcf0;
  --green-02: #f1f6e5;
  --green-00: #e9efda;
  --green-03: #d8e0c2;
  --green-04: #c7d1aa;

  /* 🔴 Red scale */
  --red-01: #e090a5;
  --red-02: #c06379;
  --red-03: #a0354d;
  --red-04: #89263d;
  --red-05: #72162e;

  /* ⚫ Neutral scale */
  --neutral-01: #f8f8f8;
  --neutral-02: #dbdbdb;
  --neutral-03: #bebebe;
  --neutral-04: #a1a1a1;
  --neutral-05: #848484;
  --neutral-06: #686868;
  --neutral-07: #4b4b4b;
  --neutral-08: #2f2f2f;
  --neutral-09: #121212;


  /* 📝 Typography */
  /* --font-title-01-size: 6.4rem;
  --font-title-01-weight: 600;
  --font-title-02-size: 3.2rem;
  --font-title-02-weight: 600;

  --font-body-01-size: 2.0rem;
  --font-body-01-weight: 400;

  --font-label-01-size: 2.0rem;
  --font-label-01-weight: 600;

  --font-caption-01-size: 1.6rem; */
  --font-caption-01-weight: 400;

  /* 🟦 Radius */
  /* --radius-s: 8px;
  --radius-m: 12px;
  --radius-l: 16px;
  --radius-xl: 20px;
  --radius-xxl: 24px; */
}

`;

export default GlobalStyle;
