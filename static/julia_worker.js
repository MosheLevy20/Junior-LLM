self.addEventListener('message', function(e) {
  var data = e.data;
  var width = data.width;
  var height = data.height;
  var juliaX = data.juliaX;
  var juliaY = data.juliaY;
  var result = [];

  for (var x = 0; x < width; x++) {
    result[x] = [];
    for (var y = 0; y < height; y++) {
      var m = mandelIter(x / width * 4 - 2, y / height * 4 - 2, juliaX, juliaY);
      result[x][y] = m * 10;
    }
  }

  self.postMessage(result);

  function mandelIter(x, y, jx, jy) {
    var zx = x;
    var zy = y;
    var i;
    for (i = 0; i < 20; i++) {
      if (zx * zx + zy * zy > 4.0) break;
      var tmp = zx * zx - zy * zy + jx;
      zy = 2.0 * zx * zy + jy;
      zx = tmp;
    }
    return i;
  }
}, false);
