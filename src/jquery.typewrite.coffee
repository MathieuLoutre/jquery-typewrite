do ($) ->
	$.fn.typewrite = (settings = {}, callback) ->
		options =
			delay: 60
			placeholder: '¶'

		if typeof settings is "function"
			callback = settings
		else
			$.extend(options, settings)

		type = =>
			if @data('content')?.length > 0
				char = @data('content')[0]
				recursive = false

				if char is options.placeholder
					char = @data('tags').shift()
					@data('tags', @data('tags'))
					recursive = true

				@data('content', @data('content').substr(1))
				@html(@html() + char)

				if recursive
					@children().last().typewrite options, =>
						@data('timer', setTimeout(type, options.delay))
				else
					@data('timer', setTimeout(type, options.delay))
			else
				clearTimeout(@data('timer'))
				@data('callback')?()
				@removeData(['content', 'timer', 'callback', 'tags'])

		@data('callback', callback)

		tags = @children().replaceWith(options.placeholder)
		tags = (tag.outerHTML for tag in tags.get())

		@data('tags', tags)
		@data('content', $.trim(@html()))
		@html("")
		@data('timer', setTimeout(type, options.delay))

		return this

	$.fn.stopTypewrite = (options = {}) ->
		options.placeholder ?= '¶'

		clearTimeout(@data('timer'))

		content = @data('content')

		if @data('tags')
			content = content.replace(options.placeholder, el) for el in @data('tags')

		$(child).stopTypewrite() for child in @children() when $(child).data('content')

		@html(@html() + content)
		@data('callback')?()
		@removeData(['content', 'timer', 'callback', 'tags'])

		return this