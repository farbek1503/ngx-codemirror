import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as CodeMirror from 'codemirror';

/* mode */
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/xml/xml.js"
import "codemirror/mode/css/css.js"
import "codemirror/mode/htmlmixed/htmlmixed.js"

/* hint */
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/anyword-hint.js"
import "codemirror/addon/hint/javascript-hint.js"
import "codemirror/addon/hint/xml-hint.js"
import "codemirror/addon/hint/html-hint.js"

/* edit */
import "codemirror/addon/edit/closebrackets.js"
import "codemirror/addon/edit/closetag.js"
import "codemirror/addon/edit/matchtags.js"

/* fold */
import "codemirror/addon/fold/xml-fold.js"

/* lint */
import "codemirror/addon/lint/lint.js"
import "codemirror/addon/lint/javascript-lint.js"
import "codemirror/addon/lint/json-lint.js"
import "codemirror/addon/lint/css-lint.js"

/* search */
import "codemirror/addon/search/search.js"
import "codemirror/addon/search/searchcursor.js"
import "codemirror/addon/search/matchesonscrollbar.js"
import "codemirror/addon/search/jump-to-line.js"

import "codemirror/addon/display/placeholder.js"
import "codemirror/addon/selection/active-line.js"
import "codemirror/addon/dialog/dialog.js"
import "codemirror/addon/scroll/annotatescrollbar.js"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	themes: any = [
		{ msg: "3024-day" },
		{ msg: "3024-night" },
		{ msg: "abbott" },
		{ msg: "abcdef" },
		{ msg: "ambiance" },
		{ msg: "ambiance-mobile" },
		{ msg: "ayu-dark" },
		{ msg: "ayu-mirage" },
		{ msg: "base16-dark" },
		{ msg: "base16-light" },
		{ msg: "bespin" },
		{ msg: "blackboard" },
		{ msg: "cobalt" },
		{ msg: "colorforth" },
		{ msg: "darcula" },
		{ msg: "dracula" },
		{ msg: "duotone-dark" },
		{ msg: "duotone-light" },
		{ msg: "eclipse" },
		{ msg: "elegant" },
		{ msg: "erlang-dark" },
		{ msg: "gruvbox-dark" },
		{ msg: "hopscotch" },
		{ msg: "icecoder" },
		{ msg: "idea" },
		{ msg: "isotope" },
		{ msg: "juejin" },
		{ msg: "lesser-dark" },
		{ msg: "liquibyte" },
		{ msg: "lucario" },
		{ msg: "material" },
		{ msg: "material-darker" },
		{ msg: "material-ocean" },
		{ msg: "material-palenight" },
		{ msg: "mbo" },
		{ msg: "mdn-like" },
		{ msg: "midnight" },
		{ msg: "monokai" },
		{ msg: "moxer" },
		{ msg: "neat" },
		{ msg: "neo" },
		{ msg: "night" },
		{ msg: "nord" },
		{ msg: "oceanic-next" },
		{ msg: "panda-syntax" },
		{ msg: "paraiso-dark" },
		{ msg: "paraiso-light" },
		{ msg: "pastel-on-dark" },
		{ msg: "railscasts" },
		{ msg: "rubyblue" },
		{ msg: "seti" },
		{ msg: "shadowfox" },
		{ msg: "solarized" },
		{ msg: "ssms" },
		{ msg: "the-matrix" },
		{ msg: "tomorrow-night-bright" },
		{ msg: "tomorrow-night-eighties" },
		{ msg: "ttcn" },
		{ msg: "twilight" },
		{ msg: "vibrant-ink" },
		{ msg: "xq-dark" },
		{ msg: "xq-light" },
		{ msg: "yeti" },
		{ msg: "yonce" },
		{ msg: "zenburn" }
	]
	
	selectTheme:string | null = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'material'
	fontSize:string | number | null = localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : 12
	fontFamily:any = localStorage.getItem('fontFamily') ? localStorage.getItem('fontFamily') : ''
	
	/* editors */
	private html!: CodeMirror.Editor;
	private css!: CodeMirror.Editor;
	private javascript!: CodeMirror.Editor;
	
	delay:any
	toggleResult:boolean = false
	isLoading: boolean = false;
	
	ngOnInit(): void {}
	
	ngAfterViewInit(){
		const html = <HTMLTextAreaElement>document.getElementById('html');
    const css = <HTMLTextAreaElement>document.getElementById('css');
    const javascript = <HTMLTextAreaElement>document.getElementById('javascript');
		
		/* html */
    this.html = CodeMirror.fromTextArea(html, {
      mode: 'htmlmixed',
			theme: 'material',
      lineNumbers: true,
			autofocus: true,
			lineWrapping: true,
			autoCloseBrackets: true,
			autoCloseTags: true,
			styleActiveLine: true,
			tabSize: 2,
			placeholder: 'Typing... HTML',
			gutters: ["CodeMirror-lint-markers"],
			lint: true,
			matchTags: {bothTags: true},
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"Ctrl-J": "toMatchingTag",
				"Alt-F": "findPersistent"
			},
		});
		
		/* css */
		this.css = CodeMirror.fromTextArea(css, {
      mode: 'css',
			theme: 'material',
      lineNumbers: true,
			lineWrapping: true,
			autoCloseBrackets: true,
			autoCloseTags: true,
			styleActiveLine: true,
			tabSize: 2,
			placeholder: 'Typing... CSS',
			gutters: ["CodeMirror-lint-markers"],
			lint: true,
			matchTags: {bothTags: true},
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"Ctrl-J": "toMatchingTag",
				"Alt-F": "findPersistent"
			},
		});
		
		/* js */
		this.javascript = CodeMirror.fromTextArea(javascript, {
      mode: 'javascript',
			theme: 'material',
      lineNumbers: true,
			lineWrapping: true,
			autoCloseBrackets: true,
			autoCloseTags: true,
			styleActiveLine: true,
			tabSize: 2,
			placeholder: 'Typing... JS',
			gutters: ["CodeMirror-lint-markers"],
			lint: true,
			matchTags: {bothTags: true},
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"Ctrl-J": "toMatchingTag",
				"Alt-F": "findPersistent"
			},
		});
		
		/* default font size */
		this.html.getWrapperElement().style.fontSize = '12px';
		this.css.getWrapperElement().style.fontSize = '12px';
		this.javascript.getWrapperElement().style.fontSize = '12px';
		
		/* localStorage data */
		const theme = localStorage.getItem('theme')
		const fontSize = localStorage.getItem('fontSize')
		const localFontFamily = localStorage.getItem('fontFamily')
		
		if(theme){
			this.html.setOption('theme', theme)
			this.css.setOption('theme', theme)
			this.javascript.setOption('theme', theme)
		}
		if(fontSize){
			this.html.getWrapperElement().style.fontSize = `${fontSize}px`;
			this.css.getWrapperElement().style.fontSize = `${fontSize}px`;
			this.javascript.getWrapperElement().style.fontSize = `${fontSize}px`;
		}
		if(localFontFamily){
			const words = localFontFamily.toLowerCase().split(' ');
			for (let i = 0; i < words.length; i++) {
				words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
			}
			const capitalizedText = words.join(' ');
			
			this.fontFamily = capitalizedText
			this.changeFont()
		}
		
		/* mobile button active class */
		var buttons = document.querySelectorAll('.buttons button');
		buttons.forEach(function(button) {
			button.addEventListener('click', function() {
				var activeButton = document.querySelector('.buttons button.active');
				if (activeButton) {
					activeButton.classList.remove('active');
				}
				
				button.classList.add('active');
			});
		});
	}
	
	updatePreview(){
		const previewFrame = document.getElementById('preview') as HTMLIFrameElement;
		const preview = previewFrame?.contentDocument || previewFrame?.contentWindow?.document;
		
		const html = this.html.getValue();
		const css = this.css.getValue();
		const js = this.javascript.getValue();
		
		const combined = `<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
		
		preview?.open();
		preview?.write(combined);
		preview?.close();
	}
	
	/* change theme */
	changeTheme(theme:any){
		this.html.setOption('theme', theme)
		this.css.setOption('theme', theme)
		this.javascript.setOption('theme', theme)
		localStorage.setItem('theme', theme)
	}
	
	/* change font size */
	editorText(event:any){
		this.html.getWrapperElement().style.fontSize = `${event.target.value}px`;
		this.css.getWrapperElement().style.fontSize = `${event.target.value}px`;
		this.javascript.getWrapperElement().style.fontSize = `${event.target.value}px`;
		localStorage.setItem('fontSize', event.target.value)
	}
	
	/* change font family */
	changeFont(){
		const words = this.fontFamily.toLowerCase().split(' ');
		for (let i = 0; i < words.length; i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
		const capitalizedText = words.join(' ');
		
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = `https://fonts.googleapis.com/css2?family=${capitalizedText}&display=swap`;
		document.head.appendChild(link);
		this.html.getWrapperElement().style.fontFamily = capitalizedText;
		this.css.getWrapperElement().style.fontFamily = capitalizedText;
		this.javascript.getWrapperElement().style.fontFamily = capitalizedText;
		localStorage.setItem('fontFamily', capitalizedText)
	}
	
	/* mobile editors focus function */
	focusHTML(){
		this.html.getWrapperElement().style.zIndex = '10';
		this.css.getWrapperElement().style.zIndex = '-1';
		this.javascript.getWrapperElement().style.zIndex = '-2';
	}
	
	focusCSS(){
		this.html.getWrapperElement().style.zIndex = '-1';
		this.css.getWrapperElement().style.zIndex = '10';
		this.javascript.getWrapperElement().style.zIndex = '-2';
	}
	
	focusJS(){
		this.html.getWrapperElement().style.zIndex = '-2';
		this.css.getWrapperElement().style.zIndex = '-1';
		this.javascript.getWrapperElement().style.zIndex = '10';
	}
	
	/* controls menu */
	toggleMenuFunc(toggle:any){
		toggle.classList.toggle('toggle')
	}
	
	/* preview */
	togglePreview(){
		this.toggleResult = !this.toggleResult
		this.isLoading = true;
		
		setTimeout(() => {
			this.updatePreview();
			this.isLoading = false;
		}, 1);
	}
	
}
