<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><!-- macro e_image parameters -->
<c:set var="classes" value="${ not empty param.classes ? param.classes : '' }" />
<!-- /macro e_image parameters -->
<!-- macro e_image body -->


    
    
    <c:set var="moduleClass" value="${ 'e-image' }" />

    
    <picture class="${ moduleClass } ${ classes }">
        <c:set var="image" value="${ null }" />
        <c:if test="${ not empty settings }">
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index != 'all' }">
                    <jsp:include page="/includes/helper/mediaQueries.jsp" /><c:set var="mediaQuery" value="${ __mediaQueries[setting.name] }" />
                    <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
                    <source data-srcset="${ image }" media="${ mediaQuery }" />
                </c:if>
            </c:forEach>
            <c:forEach var="indexAndSetting" items="${ settings }" varStatus="loop"><c:set var="index" value="${ indexAndSetting.key }" /><c:set var="setting" value="${ indexAndSetting.value }" />
                <c:if test="${ index == 'all' }">
                    <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
                    <source data-srcset="${ image }" />
                </c:if>
            </c:forEach>
        </c:if>
        <c:if test="${ empty image }">
            <c:set var="image" value="${ pageContext.request.contextPath.concat('/').concat(model) }" />
        </c:if>
        <img class="${ moduleClass }__img do-lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset="${ image }" alt="${ model.alt }" />
    </picture>

<!-- /macro e_image body -->
