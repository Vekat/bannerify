'use strict';

var assert = require('assert');
var bannerify = require('../index');
var browserify = require('browserify');
var fs = require('fs');



describe('bannerify', function() {

  it('should work with empty config', function(done) {
    var b = browserify();
    b.add('./test/fixtures/beep');
    b.plugin(bannerify);
    b.bundle(function(err) {
      assert.ifError(err);
      done();
    });
  });

  it('should work with inline template', function(done) {
    var header = '/** hello world */';
    var b = browserify();
    b.add('./test/fixtures/beep');
    b.plugin(bannerify, {
      template: header
    });
    b.bundle(function(err, buff) {
      assert.ifError(err);
      assert.notEqual(buff.toString().indexOf(header), -1);
      done();
    });
  });

  it('should work with template file', function(done) {
    var bannerPath = './test/fixtures/banner.txt';
    var b = browserify();
    b.add('./test/fixtures/beep');
    b.plugin(bannerify, {
      file: bannerPath
    });
    b.bundle(function(err, buff) {
      assert.ifError(err);
      assert.notEqual(buff.toString().indexOf('Mirco Zeiss <mirco.zeiss@gmail.com>'), -1);
      done();
    });
  });

  it('should work with explicit package', function(done) {
    var header = fs.readFileSync('./test/fixtures/banner.txt');
    var packagePath = './package.json';
    var b = browserify();
    b.add('./test/fixtures/beep');
    b.plugin(bannerify, {
      template: header,
      pkg: packagePath
    });
    b.bundle(function(err, buff) {
      assert.ifError(err);
      assert.notEqual(buff.toString().indexOf('Mirco Zeiss <mirco.zeiss@gmail.com>'), -1);
      done();
    });
  });

});
