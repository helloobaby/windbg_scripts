// 调试指定进程调用某个API

// Use JavaScript strict mode 
"use strict";

//

let log = function (e) {
    host.diagnostics.debugLog(e + '\n');
}

function output(o) {
    for (var line of o) {
        host.diagnostics.debugLog("  ", line, "\n");
    }
}

function bp_api_at_special_process(api_name, substring_process_name) {
        var ctl = host.namespace.Debugger.Utility.Control

    log(host.currentProcess.Name)
    if (host.currentProcess.Name.search(substring_process_name) != -1) {
        //log('true')

    }else{
        // 不是目标进程
        
    }
}

// Define the invokeScript method to handle breakpoints

function invokeScript() {
    var ctl = host.namespace.Debugger.Utility.Control

    var target_api='NtAllocateVirtualMemory'
    // 每次断下来 执行我这个脚本 由这个脚本来执行下面的命令
    let bp = ctl.SetBreakpointAtOffset(target_api,0,'nt')
    bp.Command='.echo "hello";gc'
}
