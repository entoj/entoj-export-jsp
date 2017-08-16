<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><!-- macro m_teaser_hero parameters -->
<c:set var="model" value="${ not empty param.model ? param.model : null }" />
<!-- /macro m_teaser_hero parameters -->
<!-- macro m_teaser_hero body -->


    <jsp:include page="includes/Modules/m-teaser.jsp"><jsp:param name="type" value="${ 'hero' }" /><jsp:param name="classes" value="${ '' }" /><jsp:param name="model" value="${ model }" /></jsp:include>

<!-- /macro m_teaser_hero body -->
