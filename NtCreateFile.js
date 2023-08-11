// https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/javascript-debugger-scripting#conditional-breakpoints-with-javascript
// bp ntcreatefile ".scriptrun D:\\workspace\\windbg_js_script\\test.js"

// 依赖js的还是少点,有bug




// Use JavaScript strict mode 
"use strict";

let log = function (e) {
    host.diagnostics.debugLog(e + '\n');
}

function output(o) {
    for (var line of o) {
        host.diagnostics.debugLog("  ", line, "\n");
    }
}


function parse_NtCreateFile() {
    var ctl = host.namespace.Debugger.Utility.Control
    var o = ctl.ExecuteCommand('dt _OBJECT_ATTRIBUTES @r8')
    output(o)

    var reFile = '_UNICODE_STRING\\s+(.*)'
    for (var line of o) {
        var res = line.match(reFile)
        if (res != null) {
            if (res[1].search('test.txt') != -1) {
                log('?????')
                log(res[1])
                ctl.ExecuteCommand('bp nt!NtCreateFile ".scriptrun D:\\\\workspace\\\\windbg_js_script\\\\test.js"')
            } else {
                log('=====')
                // 这个gc不会正确走咋回事
                // bp nt!NtCreateFile ".scriptrun D:\\workspace\\windbg_js_script\\test.js;g"
                ctl.ExecuteCommand('bp nt!NtCreateFile ".scriptrun D:\\\\workspace\\\\windbg_js_script\\\\test.js;g"')
            }
        }
        //log(res)
    }
}


// Define the invokeScript method to handle breakpoints
function invokeScript() {
    //var ctl = host.namespace.Debugger.Utility.Control
    //var Regs = host.currentThread.Registers.User
    //var CurrentProcess = host.currentProcess;

    // 这里设置不好,因为bl命令列不出来,不好删除
    //ctl.ExecuteCommand('bp  nt!NtCreateFile "dx @$scriptContents.parse_NtCreateFile()"')

    parse_NtCreateFile()
}
