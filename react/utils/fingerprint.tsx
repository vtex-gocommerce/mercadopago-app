export default {
  path: 'checkout6-custom.js',
  text: '$(\'body\').append(\'<form><input type="hidden" id="deviceId" name="deviceId" /></form>\');\n$.getScript("https://resources.mlstatic.com/device/meli-metrix.min.js", function(){});\nfunction startTimer () {\n    setTimeout(stopTimer,2000);\n}\nfunction stopTimer () {\n    window.vtex.deviceFingerprint = document.getElementById(\'deviceId\').value;\n  console.log("MP-deviceId : " + document.getElementById(\'deviceId\').value)\n}\nwindow.onload = startTimer;',
}
