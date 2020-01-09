// import jsdom from 'jsdom';
// import fs from 'fs';

// const { JSDOM } = jsdom;

test('Our first test', () => {
    expect(true).toBe(true);
});

// test('index.html test', () => {
//     JSDOM.fromFile('./src/index.html', {}).then((dom) => {
//       const h1 = dom.window.document.getElementsByTagName('h1')[0];
//       expect(h1.innerHTML).toEquald('Users');
//       dom.close;
//     });
//   });
// });
