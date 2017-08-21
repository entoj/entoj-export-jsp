<%@ page contentType="text/html; charset=UTF-8" session="false" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ taglib prefix="entoj" uri="https://entoj.io/entoj"%><!-- macro m_teaser parameters -->
<c:set var="type" value="${ not empty param.type ? param.type : 'content' }" />
<c:set var="classes" value="${ not empty param.classes ? param.classes : '' }" />
<!-- /macro m_teaser parameters -->
<!-- macro m_teaser body -->


    
    
    <c:set var="moduleClass" value="${ 'm-teaser' }" />
    <c:set var="moduleClasses" value="${ moduleClass } ${ not empty type ? moduleClass.concat('--').concat(type) : '' }" />
    <jsp:useBean id="imageSettings" class="java.util.LinkedHashMap" /><jsp:useBean id="imageSettings_mobile" class="java.util.LinkedHashMap" /><c:set target="${ imageSettings_mobile }" property="name" value="mobile" /><c:set target="${ imageSettings_mobile }" property="aspect" value="1x1" /><c:set target="${ imageSettings_mobile }" property="width" value="410" /><c:set target="${ imageSettings }" property="mobile" value="${ imageSettings_mobile }" /><jsp:useBean id="imageSettings_all" class="java.util.LinkedHashMap" /><c:set target="${ imageSettings_all }" property="aspect" value="16x9" /><c:set target="${ imageSettings_all }" property="width" value="830" /><c:set target="${ imageSettings }" property="all" value="${ imageSettings_all }" />

    
    <div class="${ moduleClasses } ${ classes }" data-entity="${ moduleClass }">
        <jsp:include page="includes/elements/e-image.jsp"><jsp:param name="model" value="${ model.image }" /><jsp:param name="settings" value="${ imageSettings }" /><jsp:param name="classes" value="${ moduleClass.concat('__image') }" /></jsp:include>
        <div class="${ moduleClass }__body">
            <c:set var="text_u1" value="${ '' }" /><c:set var="level_u1" value="${ 3 }" /><c:set var="skin_u1" value="${ 'light' }" /><c:set var="classes_u1" value="${ moduleClass.concat('__headline') }" />

    
    <c:set var="moduleClass_u1" value="${ 'e-headline' }" />
    <c:set var="element_u1" value="${ 'h'.concat(level_u1) }" />
    <c:set var="moduleClasses_u1" value="${ moduleClass_u1 } ${ not empty element_u1 ? moduleClass_u1.concat('--').concat(element_u1) : '' }" />

    
    <${ element_u1 } class="${ moduleClasses_u1 } ${ classes_u1 }">
        ${ text_u1 }${ model.headline }
    </${ element_u1 }>


            <p class="${ moduleClass }__copy">${ model.copy }</p>
            <c:choose><c:when test="${ type == 'content' }">
                <jsp:include page="includes/elements/e-cta.jsp"><jsp:param name="type" value="${ 'tertiary' }" /><jsp:param name="skin" value="${ 'light' }" /><jsp:param name="text" value="${ model.cta }" /><jsp:param name="link" value="${ model.link }" /><jsp:param name="classes" value="${ moduleClass.concat('__cta') }" /></jsp:include>
            </c:when><c:otherwise>
                <jsp:include page="includes/elements/e-cta.jsp"><jsp:param name="type" value="${ 'secondary' }" /><jsp:param name="skin" value="${ 'light' }" /><jsp:param name="text" value="${ model.cta }" /><jsp:param name="link" value="${ model.link }" /><jsp:param name="classes" value="${ moduleClass.concat('__cta') }" /></jsp:include>
            </c:otherwise></c:choose>
        </div>
    </div>

<!-- /macro m_teaser body -->
