angular.module("BlurAdmin").run(["$templateCache",function(e){e.put("app/login/auth.html",'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blur Admin</title><link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css"><link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon-96x96.png"></head><body><main class="auth-main"><div class="auth-block"><h1>Sign in to Blur Admin</h1><a href="reg.html" class="auth-link">New to Blur Admin? Sign up!</a><form class="form-horizontal"><div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input type="email" class="form-control" id="inputEmail3" placeholder="Email"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-2 control-label">Password</label><div class="col-sm-10"><input type="password" class="form-control" id="inputPassword3" placeholder="Password"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-default btn-auth">Sign in</button> <a href="" class="forgot-pass">Forgot password?</a></div></div></form><div class="auth-sep"><span><span>or Sign in with one click</span></span></div><div class="al-share-auth"><ul class="al-share clearfix"><li><i class="socicon socicon-facebook" title="Share on Facebook"></i></li><li><i class="socicon socicon-twitter" title="Share on Twitter"></i></li><li><i class="socicon socicon-google" title="Share on Google Plus"></i></li></ul></div></div></main></body></html>'),e.put("app/pages/dashboard/dashboard.html",'<dashboard-pie-chart></dashboard-pie-chart><div class="row"><div class="col-lg-6 col-md-12 col-sm-12" ba-panel="" ba-panel-title="Acquisition Channels" ba-panel-class="medium-panel traffic-panel"><traffic-chart></traffic-chart></div><div class="col-lg-6 col-md-12 col-sm-12" ba-panel="" ba-panel-title="Users by Country" ba-panel-class="medium-panel"><dashboard-map></dashboard-map></div></div><div class="row"><div class="col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12"><div class="row"><div class="col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12" ba-panel="" ba-panel-title="Revenue" ba-panel-class="medium-panel"><dashboard-line-chart></dashboard-line-chart></div><div class="col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12" ba-panel="" ba-panel-class="popular-app medium-panel"><popular-app></popular-app></div></div></div><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12" ba-panel="" ba-panel-title="Feed" ba-panel-class="large-panel with-scroll feed-panel"><blur-feed></blur-feed></div></div><div class="row shift-up"><div class="col-xlg-3 col-lg-6 col-md-6 col-xs-12" ba-panel="" ba-panel-title="To Do List" ba-panel-class="xmedium-panel feed-comply-panel with-scroll todo-panel"><dashboard-todo></dashboard-todo></div><div class="col-xlg-6 col-lg-6 col-md-6 col-xs-12" ba-panel="" ba-panel-title="Calendar" ba-panel-class="xmedium-panel feed-comply-panel with-scroll calendar-panel"><dashboard-calendar></dashboard-calendar></div></div>'),e.put("app/pages/dashboard/blurFeed/blurFeed.html",'<div class="feed-messages-container" track-width="smallContainerWidth" min-width="360"><div class="feed-message" ng-repeat="message in feed" ng-click="expandMessage(message)"><div class="message-icon" ng-if="message.type == \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"></div><div class="message-icon" ng-if="message.type != \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"> <span class="sub-photo-icon" ng-class="::message.type"></span></div><div class="text-block text-message"><div class="message-header"><span class="author">{{ ::message.author }} {{ ::message.surname}}</span></div><div class="message-content line-clamp" ng-class="{\'line-clamp-2\' : !message.expanded}"><span ng-if="message.preview">{{message.header}}</span>{{::message.text}}</div><div class="preview" ng-show="message.expanded" ng-if="message.preview"><a href="{{::message.link}}" target="_blank"><img ng-src="{{ ::( message.preview | appImage )}}"></a></div><div ng-show="message.expanded" class="message-time"><div class="post-time">{{::message.time}}</div><div class="ago-time">{{::message.ago}}</div></div></div></div></div>'),e.put("app/pages/dashboard/dashboardCalendar/dashboardCalendar.html",'<div id="calendar" class="blurCalendar"></div>'),e.put("app/pages/dashboard/dashboardLineChart/dashboardLineChart.html",'<div id="amchart"></div>'),e.put("app/pages/dashboard/dashboardMap/dashboardMap.html",'<div id="amChartMap"></div>'),e.put("app/pages/dashboard/dashboardTodo/dashboardTodo.html",'<div class="task-todo-container" ng-class="{\'transparent\': transparent}"><input type="text" value="" class="form-control task-todo" placeholder="Task to do.." ng-keyup="addToDoItem($event)" ng-model="newTodoText"> <i ng-click="addToDoItem(\'\',true)" class="add-item-icon ion-plus-round"></i><div class="box-shadow-border"></div><ul class="todo-list" ui-sortable="" ng-model="todoList"><li ng-repeat="item in todoList" ng-if="!item.deleted" ng-init="activeItem=false" ng-class="{checked: isChecked, active: activeItem}" ng-mouseenter="activeItem=true" ng-mouseleave="activeItem=false"><div class="blur-container"><div class="blur-box"></div></div><i class="mark" style="background-color: {{::item.color}}"></i> <label class="todo-checkbox custom-checkbox custom-input-success"><input type="checkbox" ng-model="isChecked"> <span class="cut-with-dots">{{ item.text }}</span></label> <i class="remove-todo ion-ios-close-empty" ng-click="item.deleted = true"></i></li></ul></div>'),e.put("app/pages/dashboard/dashboardPieChart/dashboardPieChart.html",'<div class="row pie-charts"><div class="pie-chart-item-container" ng-repeat="chart in charts"><div ba-panel=""><div class="pie-chart-item"><div class="chart" rel="{{ ::chart.color }}" data-percent="60"><span class="percent"></span></div><div class="description"><div>{{ ::chart.description }}</div><div class="description-stats">{{ ::chart.stats }}</div></div><i class="chart-icon i-{{ ::chart.icon }}"></i></div></div></div></div>'),e.put("app/pages/dashboard/popularApp/popularApp.html",'<div class="popular-app-img-container"><div class="popular-app-img"><img ng-src="{{::( \'app/my-app-logo.png\' | appImage )}}"> <span class="logo-text">Super&nbspApp</span></div></div><div class="popular-app-cost row"><div class="col-xs-9">Most Popular App</div><div class="col-xs-3 text-right">175$</div></div><div class="popular-app-info row"><div class="col-xs-4 text-left"><div class="info-label">Total Visits</div><div>47,512</div></div><div class="col-xs-4 text-center"><div class="info-label">New Visits</div><div>9,217</div></div><div class="col-xs-4 text-right"><div class="info-label">Sales</div><div>2,928</div></div></div>'),e.put("app/pages/dashboard/trafficChart/trafficChart.html",'<div class="channels-block" ng-class="{\'transparent\': transparent}"><div class="chart-bg"></div><div class="traffic-chart" id="trafficChart"><div class="canvas-holder"><canvas id="chart-area" width="280" height="280"></canvas><div class="traffic-text">1,900,128 <span>Views Total</span></div></div></div><div class="channels-info"><div><div class="channels-info-item" ng-repeat="label in doughnutData.labels" ng-init="i = $index; data = doughnutData.datasets[0]"><div class="legend-color" style="background-color: {{::data.backgroundColor[i]}}"></div><p>{{::label}}<span class="channel-number">+{{data.percentage[i]}}%</span></p><div class="progress progress-sm channel-progress"><div class="progress-bar" role="progressbar" aria-valuenow="{{data.percentage[i]}}" aria-valuemin="0" aria-valuemax="100" style="width: {{item.percentage}}%"></div></div></div></div></div></div>'),e.put("app/pages/dashboard/weather/weather.html",'<div class="weather-wrapper"><div class="weather-main-info"><h5 class="city-date font-x1dot5"><div>{{geoData.geoplugin_city}} - {{geoData.geoplugin_countryName | uppercase}}</div><div>{{ weather.days[weather.current].date | date : \'EEEE h:mm\'}}</div></h5><div class="weather-description font-x1dot5"><i class="font-x3 {{weatherIcons[weather.days[weather.current].icon]}}"></i><div class="weather-info">{{weather.days[weather.current].main}} - {{weather.days[weather.current].description}}</div></div><div class="weather-temp font-x1dot5"><i class="font-x2 ion-thermometer"></i><div class="weather-info" ng-switch="" on="units"><span ng-switch-when="metric">{{weather.days[weather.current].temp}} °C | <a ng-click="switchUnits(\'imperial\')" href="">°F</a></span> <span ng-switch-when="imperial">{{weather.days[weather.current].temp}} °F | <a ng-click="switchUnits(\'metric\')" href="">°C</a></span></div></div></div><div id="tempChart" class="temp-by-time"></div><div class="select-day"><div class="day" ng-repeat="day in weather.days" ng-click="switchDay($index)"><div><span class="font-x1dot25">{{day.temp}}</span></div><div><i class="weatherIcon font-x2 {{weatherIcons[day.icon]}}"></i> <span class="select-day-info">{{day.main}}</span></div><div><span>{{day.date | date : \'EEE\'}}</span></div></div></div></div>'),e.put("app/theme/components/backTop/backTop.html",'<i class="fa fa-angle-up back-top" id="backTop" title="Back to Top"></i>'),e.put("app/theme/components/baWizard/baWizard.html",'<div class="ba-wizard"><div class="ba-wizard-navigation-container"><div ng-repeat="t in $baWizardController.tabs" class="ba-wizard-navigation {{$baWizardController.tabNum == $index ? \'active\' : \'\'}}" ng-click="$baWizardController.selectTab($index)">{{t.title}}</div></div><div class="progress ba-wizard-progress"><div class="progress-bar progress-bar-danger active" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-style="{width: $baWizardController.progress + \'%\'}"></div></div><div class="steps" ng-transclude=""></div><nav><ul class="pager ba-wizard-pager"><li class="previous"><button ng-disabled="$baWizardController.isFirstTab()" ng-click="$baWizardController.previousTab()" type="button" class="btn btn-primary"><span aria-hidden="true">&larr;</span> previous</button></li><li class="next"><button ng-disabled="$baWizardController.isLastTab()" ng-click="$baWizardController.nextTab()" type="button" class="btn btn-primary">next <span aria-hidden="true">&rarr;</span></button></li></ul></nav></div>'),e.put("app/theme/components/baWizard/baWizardStep.html",'<section ng-show="selected" class="step" ng-transclude=""></section>'),e.put("app/theme/components/baSidebar/ba-sidebar.html",'<aside class="al-sidebar" ng-swipe-right="$baSidebarService.setMenuCollapsed(false)" ng-swipe-left="$baSidebarService.setMenuCollapsed(true)" ng-mouseleave="hoverElemTop=selectElemTop"><ul class="al-sidebar-list" slimscroll="{height: \'{{menuHeight}}px\'}" slimscroll-watch="menuHeight"><li ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span>{{ ::subitem.title }}</span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link">{{ ::subSubitem.title }}</a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}">{{::subSubitem.title }}</a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link">{{ ::subitem.title }}</a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}">{{ ::subitem.title}}</a></li></ul></li></ul><div class="sidebar-hover-elem" ng-style="{top: hoverElemTop + \'px\', height: hoverElemHeight + \'px\'}" ng-class="{\'show-hover-elem\': showHoverElem }"></div></aside>'),e.put("app/theme/components/contentTop/contentTop.html",'<div class="content-top clearfix"><h1 class="al-title">{{ activePageTitle }}</h1><ul class="breadcrumb al-breadcrumb"><li><a href="#/dashboard">Home</a></li><li>{{ activePageTitle }}</li></ul></div>'),e.put("app/theme/components/msgCenter/msgCenter.html",'<ul class="al-msg-center clearfix"><li uib-dropdown=""><a href="" uib-dropdown-toggle=""><i class="fa fa-bell-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Notifications</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in notifications"><div class="img-area"><img ng-class="{\'photo-msg-item\' : !msg.image}" ng-src="{{::( msg.image || (users[msg.userId].name | profilePicture) )}}"></div><div class="msg-area"><div ng-bind-html="getMessage(msg)"></div><span>{{ msg.time }}</span></div></a></div><a href="">See all notifications</a></div></li><li uib-dropdown=""><a href="" class="msg" uib-dropdown-toggle=""><i class="fa fa-envelope-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Messages</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in messages"><div class="img-area"><img class="photo-msg-item" ng-src="{{::( users[msg.userId].name | profilePicture )}}"></div><div class="msg-area"><div>{{ msg.text }}</div><span>{{ msg.time }}</span></div></a></div><a href="">See all messages</a></div></li></ul>'),e.put("app/theme/components/pageTop/pageTop.html",'<div class="page-top clearfix" scroll-position="scrolled" max-height="50" ng-class="{\'scrolled\': scrolled}"><a href="#/dashboard" class="al-logo clearfix"><span>Blur</span>Admin</a> <a href="" class="collapse-menu-link ion-navicon" ba-sidebar-toggle-menu=""></a><div class="search"><i class="ion-ios-search-strong" ng-click="startSearch()"></i> <input id="searchInput" type="text" placeholder="Search for..."></div><div class="user-profile clearfix"><div class="al-user-profile" uib-dropdown=""><a uib-dropdown-toggle="" class="profile-toggle-link"><img ng-src="{{::( \'Nasta\' | profilePicture )}}"></a><ul class="top-dropdown-menu profile-dropdown" uib-dropdown-menu=""><li><i class="dropdown-arr"></i></li><li><a href="#/profile"><i class="fa fa-user"></i>Profile</a></li><li><a href=""><i class="fa fa-cog"></i>Settings</a></li><li><a href="" class="signout"><i class="fa fa-power-off"></i>Sign out</a></li></ul></div></div></div>'),e.put("app/theme/components/progressBarRound/progressBarRound.html",'<svg class="center-block progress-bar-round" width="200" height="200"><circle cx="100" cy="100" r="90" fill="none" stroke="#F8F8FF" stroke-width="8"></circle><circle cx="100" cy="100" r="90" fill="none" id="loader" class="" stroke="#209e91" stroke-width="8" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" stroke-linecap="round"></circle><text text-anchor="middle" class="loading" x="100" y="90">Loading...</text><text class="percentage" text-anchor="middle" x="100" y="130">{{progress}}%</text></svg>'),e.put("app/theme/components/widgets/widgets.html",'<div class="widgets"><div ng-repeat="widgetBlock in ngModel" ng-class="{\'row\': widgetBlock.widgets.length > 1}"><div ng-repeat="widgetCol in widgetBlock.widgets" ng-class="{\'col-md-6\': widgetBlock.widgets.length === 2}" ng-model="widgetCol" class="widgets-block"><div ba-panel="" ba-panel-title="{{::widget.title}}" ng-repeat="widget in widgetCol" ba-panel-class="with-scroll {{widget.panelClass}}"><div ng-include="widget.url"></div></div></div></div></div>'),e.put("app/theme/inputs/baSwitcher/baSwitcher.html",'<label class="switcher-container"><input type="checkbox" ng-model="switcherValue"><div class="switcher" ng-class="::switcherStyle"><div class="handle-container"><span class="handle handle-on">ON</span> <span class="handle"></span> <span class="handle handle-off">OFF</span></div></div></label>')}]);
//# sourceMappingURL=../maps/scripts/app-7577ff69dc.js.map
