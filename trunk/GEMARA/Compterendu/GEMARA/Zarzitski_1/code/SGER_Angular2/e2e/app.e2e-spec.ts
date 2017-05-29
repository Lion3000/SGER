import { MyNewApp2Page } from './app.po';

describe('my-new-app2 App', () => {
  let page: MyNewApp2Page;

  beforeEach(() => {
    page = new MyNewApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
