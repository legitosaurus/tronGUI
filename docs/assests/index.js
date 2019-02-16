function resetLog(){
    return document.getElementById("log-container").innerHTML = "";
}

function addLog(message,type){
    var el = document.getElementById("log-container");
    var newItem = document.createElement("LI");       // Create a <li> node
    var textnode = document.createTextNode(message);  // Create a text node
    if(type == "error"){
        newItem.style.color = "red";
    }else if(type == "final"){
        newItem.style.color = "blue";
    }

    newItem.appendChild(textnode);                    // Append the text to <li>
    el.appendChild(newItem);
}

function readLog(){

  Tail = require('tail').Tail;
  tail = new Tail("C:\\logs\\tron\\tron.log", "\n", {}, true);

  tail.on("line", function(data) {
    addLog(data);
  });

  tail.on("error", function(error) {
    console.log('ERROR: ', error);
  });

}

function ready(){
  document.getElementById("executeBat").addEventListener("click",function(e){
      var myBatFilePath = "C:\\Users\\pavitar\\Desktop\\tron\\startTron.bat";

      const spawn = require('child_process').spawn;
      const bat = spawn('cmd.exe', ['/c', myBatFilePath]);

      bat.stdout.on('data', (data) => {
          var str = String.fromCharCode.apply(null, data);
          addLog(data);
          console.info(str);
      });

      bat.stderr.on('data', (data) => {
          var str = String.fromCharCode.apply(null, data);
          addLog(data,"error");
          console.error(str);
      });

      bat.on('exit', (code) => {
          console.log(`Child exited with code ${code}`);
          var preText = `Child exited with code ${code} : `;

          switch(code){
              case 0:
                  addLog(preText+"Something unknown happened executing the batch.","final");
                  break;
              case 1:
                  addLog(preText+"The file already exists","final");
                  break;
              case 2:
                  addLog(preText+"The file doesn't exists and now is created","final");
                  break;
              case 3:
                  addLog(preText+"An error ocurred while creating the file","final");
                  break;
          }
      });
  },false);
}

function check(isChecked) {
	if(isChecked) {
		$('input[name="mainoptions"]').each(function() {
			this.checked = true;
      $("#main").text("Uncheck All");
		});
	} else {
		$('input[name="mainoptions"]').each(function() {
			this.checked = false;
      $("#main").text("Check All");
		});
	}
}

(function () {

  const remote = require('electron').remote;

  function init() {
    document.getElementById("min-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.minimize();
    });

    document.getElementById("max-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
        }
      });

      document.getElementById("close-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close();
      });
    };

    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        init();
      }
    };

})();
