import { Injectable } from '@angular/core';
import { AtlpCommonPaymentAPI } from '../config/payment.config';
interface Scripts {
  name: string;
  src: string;
  type: string;
}
export let ScriptStore: Scripts[] = [];

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private scripts: any = {};
  constructor(private atlpCommonPaymentAPI: AtlpCommonPaymentAPI) {
    ScriptStore = [
      {
        name: 'jquery',
        type: 'js',
        src: `https://code.jquery.com/jquery-3.6.0.min.js`,
      },
      {
        name: 'applePayjs',
        type: 'js',
        src: `${this.atlpCommonPaymentAPI.GET_MPAY_PAYMNET_API_BASE_URL()}Scripts/ApplePayAPIDriven.js`,
      },
      {
        name: 'applePaycss',
        type: 'css',
        src: `${this.atlpCommonPaymentAPI.GET_MPAY_PAYMNET_API_BASE_URL()}Content/pay.css`,
      },
    ];

    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
        type: script.type,
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        let script: any;
        if (this.scripts[name].type === 'js') {
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.scripts[name].src;
        } else {
          script = document.createElement('link');
          script.href = this.scripts[name].src;
          script.rel = 'stylesheet';
        }
        script.onload = () => {
          this.scripts[name].loaded = true;
          // console.log(`${name} Loaded.`);
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
