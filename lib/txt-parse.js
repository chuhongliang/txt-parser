
const fs = require('fs');

class TxtParser {

	parseFile(filePath) {
		let self = this;
		let result = {};
		let contents = fs.readFileSync(filePath, 'utf-8');
		let lines = contents.split('\r\n');
		if (lines.length === 1) {
			lines = contents.split('\n');// 说明只有换行没有回车键
		}

		let titleArr = lines[0].split('\t');
		titleArr.forEach(function (item, index, array) {
			array[index] = item.replace(/(^\s*)/g, '');//去除空格回车
		});

		lines.splice(0, 1);
		lines.forEach(function (line) {
			let subtitle = line.substr(0, 2);
			if (subtitle !== '//' && subtitle !== '') {
				let lineFields = line.split('\t');
				let item = self.toItem(titleArr, lineFields);
				result[item.id] = item;
			}
		});
		return result;
	}

	toItem(titleArr, lineFields) {
		let item = {};
		let length = titleArr.length;
		for (let x = 0; x < length; x++) {
			let title = titleArr[x];
			let fieldValue = lineFields[x];
			if (!isNaN(Number(fieldValue))) {
				fieldValue = Number(fieldValue);
			}
			item[title] = fieldValue;
		}
		return item;
	}

}
module.exports = new TxtParser();

