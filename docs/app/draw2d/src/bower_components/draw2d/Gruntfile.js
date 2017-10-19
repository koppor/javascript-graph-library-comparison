module.exports = function (grunt) {

    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json', "bower.json"],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json', "dist/*.js"],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: true,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        }
    });


    grunt.loadNpmTasks('grunt-bump');

};

