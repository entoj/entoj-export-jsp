<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><!-- macro e_image parameters -->
<c:set var="model" value="${ not empty param.model ? param.model : null }" />
<c:set var="settings" value="${ not empty param.settings ? param.settings : null }" />
<c:set var="classes" value="${ not empty param.classes ? param.classes : '' }" />
<!-- /macro e_image parameters -->
<!-- macro e_image body -->


    
    
    <c:set var="moduleClass" value="${ 'e-image' }" />

    
    <picture class="${ moduleClass } ${ classes }">
        <c:set var="image" value="${ null }" />
        <c:if test="${ not empty settings }">
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index != 'all' }">
                    <c:set var="mediaQuery" value="${ setting.name.mediaQuery() }" />
                    <c:set var="image" value="${ model.imageUrl(setting.aspect, setting.width, setting.height) }" />
                    <source data-srcset="${ image }" media="${ mediaQuery }" />
                </c:if>
            </c:forEach>
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index == 'all' }">
                    <c:set var="image" value="${ model.imageUrl(setting.aspect, setting.width, setting.height) }" />
                    <source data-srcset="${ image }" />
                </c:if>
            </c:forEach>
        </c:if>
        <c:if test="${ empty image }">
            <c:set var="image" value="${ model.imageUrl() }" />
        </c:if>
        <img class="${ moduleClass }__img do-lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="${ image }" alt="${ model.alt }" />
    </picture>

<!-- /macro e_image body -->
