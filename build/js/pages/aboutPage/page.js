!function(){return function e(t,n,i){function r(o,u){if(!n[o]){if(!t[o]){var g="function"==typeof require&&require;if(!u&&g)return g(o,!0);if(a)return a(o,!0);var p=new Error("Cannot find module '"+o+"'");throw p.code="MODULE_NOT_FOUND",p}var s=n[o]={exports:{}};t[o][0].call(s.exports,function(e){return r(t[o][1][e]||e)},s,s.exports,e,t,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}}()({1:[function(e,t,n){let i={init:()=>{engine.make.init.page("page-about","page"),engine.common.tell("building",!1),engine.make.div({id:"greetings",parent:"page-about",class:"greetings",text:"greetings this is the about page"})},ref:"page-about",type:"page",name:"aboutPage",contModules:{},contList:{},trackers:{title:"sample page title",meta:[{name:"description",content:"this is a sample page description"},{name:"keywords",content:"page,vegana"}],function_data:{},function:e=>{}}};t.exports=i,window.pageModules.aboutPage=i},{}]},{},[1]);