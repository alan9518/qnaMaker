<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" meta:progid="SharePoint.WebPartPage.Document" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <WebPartPages:AllowFraming runat="server" />
  <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.runtime.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <head><meta charset="utf-8"/><link rel="shortcut icon" href="/sites/cortex/qnaLegal/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Web site created using create-react-app"/><link rel="apple-touch-icon" href="logo192.png"/><link rel="manifest" href="/sites/cortex/qnaLegal/manifest.json"/><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css?family=Lato:400,700,300" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Catamaran:400,500" rel="stylesheet"><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><style>.modal-backdrop{display:none}#DeltaHelpPanel,#DeltaPageInstrumentation,#DeltaPlaceHolderUtilityContent,#flexFooter,#s4-ribbonrow,div#s4-titlerow,div#sideNavBox,span#DeltaDelegateControls,span#DeltaSPWebPartManager{display:none!important}#contentBox{margin-right:0!important;margin-left:0!important;width:100%!important}#contentRow{padding-top:0}#s4-bodyContainer{padding-bottom:0!important}#containerParallax{padding-left:0!important;padding-right:0!important}.container .jumbotron,.container-fluid .jumbotron{border-radius:0!important}</style><title>Flex QnA Maker</title><link href="/sites/cortex/qnaLegal/static/css/main.73844b74.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script type="text/javascript" src="/sites/cortex/qnaLegal/static/js/main.ee76aee9.js"></script></body>


</asp:Content>



