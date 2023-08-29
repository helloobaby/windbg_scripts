// 搜集开启了EnableReadVmLogging标志的进程


// 日志
let log = function (e) {
    host.diagnostics.debugLog(e + '\n');
}

// 输出一个对象
function output(o) {
    for (var line of o) {
        host.diagnostics.debugLog("  ", line, "\n");
    }
}

function read8(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.readMemoryValues(x, 1, 1)[0]; }
function read16(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.readMemoryValues(x, 1, 2)[0]; }
function read32(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.readMemoryValues(x, 1, 4)[0]; }
function read64(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.readMemoryValues(x, 1, 8)[0]; }
function write8(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.writeMemoryValues(x, 1, 1)[0]; }
function write16(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.writeMemoryValues(x, 1, 2)[0]; }
function write32(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.writeMemoryValues(x, 1, 4)[0]; }
function write64(x, phy = false) { if (phy) { x = host.memory.physicalAddress(x); } return host.memory.writeMemoryValues(x, 1, 8)[0]; }

// Define the invokeScript method to handle breakpoints

function invokeScript() {   
    var ctl = host.namespace.Debugger.Utility.Control
    var result=ctl.ExecuteCommand('!for_each_process')
    var process_list=[]
    var reProcess='PROCESS ([0-9a-fA-F]+)'
    for (var line of result) {
        var res = line.match(reProcess)
        if(res != null){
            eprocess=host.parseInt64(res[1],16)
            flags=read32(eprocess.add(0x300))
            //log(flags)
            if(flags&2000000){
                //log(res[1])
                str=host.memory.readString(eprocess.add(0x450),15)
                log(str)
            }
            
    }
    }
}
