import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.tree import export_graphviz
from IPython.display import Image
import pydotplus
import pickle

dataset_url = 'https://raw.githubusercontent.com/Falskim/datamining-decisiontree-diabetes/main/diabetes_data_upload.csv'
asset_directory = 'static'
model_filename = 'tree_model.sav'
image_filename = 'dtree.png'
result = {}

def run(param = None):
  prepare_dataset()
  create_model(param)
  create_graph()
  return result

def prepare_dataset():
  global x, y
   
  # Load dataset
  df = pd.read_csv(dataset_url)

  # Map attributes variable
  gender_mapping_values = {'Male': 1, 'Female': 0}
  df.replace({'Gender':gender_mapping_values}, inplace=True)

  syndrome_mapping_values = {'Yes': 1, 'No': 0}
  for feature in df.columns[2:-1]:
    df.replace({feature:syndrome_mapping_values}, inplace=True)

  class_mapping_values = {'Positive': 1, 'Negative': 0}
  df.replace({'class':class_mapping_values}, inplace=True)

  # select attributes as features and label
  x = df.drop('class', axis=1)
  y = df['class']

def create_model(param = None):
  global tree_model

  print(param)
  print(param['auto'])
  if param == None or param['auto']:
    parameters = {'criterion':['gini','entropy'],
                  'max_depth':range(3,15)}
  else:
    parameters = {'criterion':[param['criterion']],
                  'max_depth':[int(param['max_depth'])]}

  clf = GridSearchCV(DecisionTreeClassifier(), parameters)
  clf.fit(x, y)
  tree_model = clf.best_estimator_

  print('Best score : ', clf.best_score_)
  print('Best parameter: ', clf.best_params_)
  result['accuracy'] = clf.best_score_
  result['criterion'] = clf.best_params_['criterion']
  result['max_depth'] = clf.best_params_['max_depth']

  save_model()

def save_model():
  save_path = asset_directory + '/' + model_filename
  pickle.dump(tree_model, open(save_path, 'wb'))
  print('Decision tree trained model saved as ', save_path)

def create_graph():
  dot_data = export_graphviz(
      tree_model,
      out_file = None,
      feature_names = list(x.columns.values),
      class_names = ['Positive', 'Negative'],
      rounded = True,
      filled = True
  )

  graph = pydotplus.graph_from_dot_data(dot_data)

  save_graph_image(graph)

def save_graph_image(graph):
  save_path = asset_directory + '/' + image_filename
  graph.write_png(save_path)
  print('Decision tree model image saved as ', save_path)

if __name__ == '__main__':
    run()