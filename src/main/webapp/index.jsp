<!doctype html>
<html ng-app="demoApp" ng-controller="MainController">
<head>
    <title>My Angular App</title>
    <script src="/js/angular/angular.js"></script>
    <script src="/js/angular/angular-route.js"></script>
    <script src="/js/controllers.js"></script>
    <script src="/js/app.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/app.css">
    <base href="/">
</head>
<body>
    <div class="author">Nikolai Umnikov</div>
    <div class="leftMenu">
        <div class="leftMenuItem" left-menu-item app="{name: 'Main page'}"></div>
        <hr>
        <div ng-repeat="app in apps">
            <div class="leftMenuItem" app="app" left-menu-item ng-mouseover="onMouseOver(app.id)"
                 ng-mouseout="onMouseOut(app.id)">
                <%--<a href="/apps/{{app.id}}">{{app.name}}</a>--%>
            </div>
        </div>
    </div>
    <div class="viewSection">
        <div ng-view class="view-frame"></div>
    </div>
    <%--<script src="http://s3.amazonaws.com/crazyinput/main/main.nocache.js"></script>--%>
</body>
</html>
