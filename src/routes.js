/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import GuaGuaLe from './components/GuaGuaLe';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/gua/:id', async (state) => {
    console.log(state, 'params');
    const id = { 
      id: state.params.id
    };
    const objId = {
      param: JSON.stringify(id)
    };
    var paramId = Object.keys(objId).map(function(key) {
        return key + '=' + objId[key];
    }).join('&');
    // const response = await fetch("http://192.168.1.106:2692/award_activity.wn", {
    //   method: 'post',
    //   body: paramId
    // });
    // const content = await response.json();
    // const  data = content.data;
    // console.log(data);
    return <GuaGuaLe />
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
