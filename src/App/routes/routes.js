import { Switch } from "react-router-dom";
import React from 'react';
import { renderRoutes } from "react-router-config";
import Home from '../../view/home/home'
import PageNotFound from '../../view/404/404.js'
import Proprietaire from '../../view/proprietaire/proprietaire'
import Partenaire from '../../view/partenaire/partenaire'
import { loadHomeData } from '../../reducer/home'
import ConfierVosBiens from '../../view/page/confier-vos-biens/confier-vos-biens'
import LaisserVousGuider from '../../view/page/laisser-vous-guider/laisser-vous-guider'
import Recherche from '../../view/recherche/recherche'

export const Routes = [
    {
      path: '/',
      exact : true,
      component: Home,
      loadData: () => loadHomeData()
    },
    {
      path: '/partenaire',
      exact : true,
      component: Partenaire,
    },
    {
      path: '/proprietaire',
      exact : true,
      component: Proprietaire,
    },
    {
      path : '/recherche/:ville?',
      exact : true,
      component : Recherche
    },
    {
      path : '/confier-vos-biens',
      exact : true,
      component : ConfierVosBiens
    },
    {
      path : '/laisser-vous-guider',
      exact : true,
      component : LaisserVousGuider
    },
    {
      component: PageNotFound,
    }
  ]
  
  function getRoutes (location) {
    return (
      <Switch>
        {typeof location === "undefined" ?
            renderRoutes(Routes)
        :
          renderRoutes(Routes, {location : location})
        }
      </Switch>
    )
  }
  
  export default getRoutes