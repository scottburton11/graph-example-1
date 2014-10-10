require 'faraday'
require 'google_doc_seed'

class SpreadsheetImporter
  attr_reader :seeder, :document_key

  def initialize(document_key)
    @seeder = GoogleDocSeed.new(access_token)
    @document_key = document_key
  end

  def response
    Faraday.post("https://accounts.google.com/o/oauth2/token",
                                    refresh_token:  ENV['GOOGLE_REFRESH_TOKEN'],
                                    client_id:      ENV['GOOGLE_CLIENT_ID'],
                                    client_secret:  ENV['GOOGLE_CLIENT_SECRET'],
                                    grant_type:     "refresh_token")
  end

  def access_token
    JSON.parse(response.body)['access_token']
  end

  def csv_string(worksheet = nil)
    seeder.to_csv_string(document_key, worksheet)
  end
end