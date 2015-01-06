
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",900,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Group3}","mouseenter",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Group3}","mouseleave",function(sym,e){sym.playReverse();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_BenAlderfer}","click",function(sym,e){window.open("http://www.BenAlderfer.com","_self");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_RoyFu}","click",function(sym,e){window.open("http://www.RoyFu.org","_self");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_bitly}","click",function(sym,e){window.open("http://bit.ly/1dXAsZe","_self");});
//Edge binding end
})("stage");
//Edge symbol end:'stage'
})(jQuery,AdobeEdge,"EDGE-51150622");