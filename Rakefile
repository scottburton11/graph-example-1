require 'bundler/setup'

require 'dotenv'
Dotenv.load

$: << "."

require 'lib/spreadsheet_importer'


desc "Import the graph"
task :import_from_google do
  
  si = SpreadsheetImporter.new(ENV['GOOGLE_DOCUMENT_KEY'])

  require 'pry'
  binding.pry

  nodes = CSV.parse(si.csv_string, :headers => true)
  links = CSV.parse(si.csv_string('links'), :headers => true)


  data = {
    nodes: nodes,
    links: links.map do |link|
      {
        source: nodes.index do |node|
          node['slug'] == link['source']
        end,
        target: nodes.index do |node|
          node['slug'] == link['target']
        end
      }
    end
  }

  File.open("./public/data.json", "w+") do |file|
    file.write data
  end
end

desc "Import the graph from a .csv"
task :import do
  require 'csv'

  nodes = CSV.parse(File.read("./nodes.csv"), :headers => true)
  links = CSV.parse(File.read("./links.csv"), :headers => true)

  # require 'pry'
  # binding.pry

  data = {
    nodes: nodes.map(&:to_h),
    links: links.map do |link|
      {
        source: nodes.find_index do |node|
          node['slug'] == link['source']
        end,
        target: nodes.find_index do |node|
          node['slug'] == link['target']
        end
      }
    end
  }

  File.open("./public/data.json", "w+") do |file|
    file.write JSON.dump(data)
  end

end