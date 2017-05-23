import { AngularCCHDTwoPage } from './app.po';

describe('angular-cchdtwo App', () => {
  let page: AngularCCHDTwoPage;

  beforeEach(() => {
    page = new AngularCCHDTwoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
