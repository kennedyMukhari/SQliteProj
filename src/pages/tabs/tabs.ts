import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WelcomePage;
  tab2Root = AboutPage;
  tab3Root = HomePage;

  constructor() {

  }
}
