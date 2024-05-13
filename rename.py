import os

def rename_files(folder_path, prefix):
    if not os.path.exists(folder_path):
        print(f"Folder '{folder_path}' does not exist.")
        return
    
    file_list = os.listdir(folder_path)
    for index, filename in enumerate(file_list):
        file_extension = os.path.splitext(filename)[1]
        new_filename = f"{prefix}_{index}{file_extension}"
        os.rename(os.path.join(folder_path, filename), os.path.join(folder_path, new_filename))

# Example usage
folder_path = r"C:\Users\Sujit\Desktop\web scapping\catimages"
prefix = 'img'
rename_files(folder_path, prefix)
