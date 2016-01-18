import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
// 刮刮乐
import GuaGuaLe from './components/GuaGuaLe';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  // 刮刮乐路由
  on('/gua/:id', (state) => {
    const token = state.query.token; // 客户端传回的token
    const id = state.params.id; // 抽奖活动id
    return <GuaGuaLe isLogin={token} activityId={id} />
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
