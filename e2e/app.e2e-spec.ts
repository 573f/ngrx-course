import { NgrxCoursePage } from './app.po';

describe('ngrx-course App', () => {
  let page: NgrxCoursePage;

  beforeEach(() => {
    page = new NgrxCoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
