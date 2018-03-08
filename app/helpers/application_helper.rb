module ApplicationHelper
	THEME = 'theme-'.freeze

	def title_tag(str)
    content_for :title, raw("#{str} · #{Setting.app_name}")
  end

  def active_state(color)
  	cookies[:skins] ||= "red"
  	cookies[:skins] == color ? "active" : ''
  end

  def current_theme
  	THEME + (cookies[:skins] || "red")
  end
end
