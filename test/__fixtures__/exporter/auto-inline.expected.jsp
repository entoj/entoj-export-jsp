<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><!-- macro m_teaser parameters -->
<c:set var="type" value="${ not empty param.type ? param.type : 'content' }" />
<c:set var="classes" value="${ not empty param.classes ? param.classes : '' }" />
<!-- /macro m_teaser parameters -->
<!-- macro m_teaser body -->


    
    
    
    
    

    
    <div class="${ } ${ }" data-entity="${ }">
        <jsp:include page="/includes/elements/e-image.jsp"><jsp:param name="model" value="${  }" /><jsp:param name="settings" value="${  }" /><jsp:param name="classes" value="${  }" /></jsp:include>
        <div class="${ }__body">
            <c:set var="text_u1" value="${ '' }" /><c:set var="level_u1" value="${ 3 }" /><c:set var="skin_u1" value="${ 'light' }" /><c:set var="classes_u1" value="${  }" />

    
    
    
    

    
    <${ } class="${ } ${ }">
        ${ }${ }
    </${ }>


            <p class="${ }__copy">${ }</p>
            <c:choose><c:when test="${  == 'content' }">
                <jsp:include page="/includes/elements/e-cta.jsp"><jsp:param name="type" value="${ 'tertiary' }" /><jsp:param name="skin" value="${ 'light' }" /><jsp:param name="text" value="${  }" /><jsp:param name="link" value="${  }" /><jsp:param name="classes" value="${  }" /></jsp:include>
            </c:when><c:otherwise>
                <jsp:include page="/includes/elements/e-cta.jsp"><jsp:param name="type" value="${ 'secondary' }" /><jsp:param name="skin" value="${ 'light' }" /><jsp:param name="text" value="${  }" /><jsp:param name="link" value="${  }" /><jsp:param name="classes" value="${  }" /></jsp:include>
            </c:otherwise></c:choose>
        </div>
    </div>

<!-- /macro m_teaser body -->
